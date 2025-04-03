import React, { useState, useEffect, useRef } from 'react';

const Playing = ({ songItems, playing, songIndex, audio, songImgUrl }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        if (playing) {
            intervalIdRef.current = setInterval(() => {
                setCurrentTime(audio.currentTime);
            }, 1000);
        } else {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [playing, audio]);

    var currentTimeRender = Math.floor(currentTime / 60) + ":" + Math.floor(currentTime % 60);
    var durationRender = Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
    const percentageComplete = { width: (currentTime / audio.duration * 100) + "%" };

    if (durationRender === "NaN:NaN") {
        durationRender = "0:00";
    }
    if (Math.floor(currentTime % 60 < 10)) {
        currentTimeRender = Math.floor(currentTime / 60) + ":0" + Math.floor(currentTime % 60);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-[270px] h-[190px] bg-[#E3F2FD] flex flex-col justify-between box-border p-[10px]">
            <div className="flex items-center justify-between box-border p-[10px]">
                <img src={songImgUrl} alt="songImg" className="m-auto mt-[10px] w-[110px] h-[110px] rounded-[5px] object-cover"></img>
                <div>
                    <h6 className="m-[2px] ml-[5px] text-[18px]">{songItems[songIndex]}</h6>
                    {playing && <h4 className="mt-[10px] text-[16px] text-[#666]">Playing</h4>}
                    {!playing && <h4 className="mt-[10px] text-[16px] text-[#666]">Paused</h4>}
                </div>
            </div>
            <div className="mt-[10px] flex items-center justify-center w-full gap-[5px]">
                {formatTime(currentTime)}
                <div className="w-[65%] h-[10px] mx-[5px] bg-gray-300">
                    <div style={percentageComplete} className="h-[10px] bg-green-500"></div>
                </div>
                {formatTime(audio.duration)}
            </div>
        </div>
    )
}

export default Playing;