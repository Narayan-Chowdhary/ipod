import React, { useState, useEffect, useRef } from 'react';
import "../css/Playing.css"

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
        <div className="now-playing-container">
            <div className="song-details">
                <img src={songImgUrl} alt="songImg"></img>
                <div>
                    <h6>{songItems[songIndex]}</h6>
                    {playing && <h4 className="play-pause-nav">Playing</h4>}
                    {!playing && <h4 className="play-pause-nav">Paused</h4>}
                </div>
            </div>
            <div className="status">
                {formatTime(currentTime)}
                <div id="progress">
                    <div style={percentageComplete} id="progress-bar"></div>
                </div>
                {formatTime(audio.duration)}
            </div>
        </div>
    )
}

export default Playing;