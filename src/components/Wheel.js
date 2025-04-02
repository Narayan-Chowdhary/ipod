import React, { useEffect, useRef } from 'react';
import "../css/Wheel.css"
import ZingTouch from 'zingtouch';

// Render wheel
const Wheel = ({ changeMenuForward, active, currentMenu, theme, wheelColor, changeMenuBackward, togglePlayPause, seekSongForward, seekSongReverse, updateActiveMenu }) => {
    const wheelControll = useRef(null);
    const angle = useRef(0);

    useEffect(() => {
        // control the wheel rotation action if rotation is more than 15 degrees and also check direction of rotation
        wheelControll.current = (e) => {
            if (e.detail.distanceFromOrigin === 0) {
                angle.current = e.detail.angle;
            }
            if (Math.abs(angle.current - e.detail.angle) > 300) {
                angle.current = Math.abs(e.detail.angle);
                if (e.detail.distanceFromLast === 0) {
                    return;
                }
                else if (e.detail.distanceFromLast < 0) {
                    updateActiveMenu(1, currentMenu);
                } else {
                    updateActiveMenu(0, currentMenu);
                }
            } else if (Math.abs(angle.current - e.detail.angle) > 15) {
                angle.current = Math.abs(e.detail.angle);
                if (e.detail.distanceFromLast === 0) {
                    return;
                }
                else if (e.detail.distanceFromLast > 0) {
                    updateActiveMenu(1, currentMenu);
                } else {
                    updateActiveMenu(0, currentMenu);
                }
            }
        };

        const wheel = document.getElementById("wheel");
        const activeRegion = ZingTouch.Region(wheel);
        const menuIcon = document.getElementById("menu");
        const playPause = document.getElementById("play-pause");
        const reverse = document.getElementById("reverse");
        const forward = document.getElementById("forward");

        const longTapGesture = new ZingTouch.Tap({
            maxDelay: 10000,
            numInputs: 1,
            tolerance: 1,
        });

        activeRegion.bind(menuIcon, 'tap', function (e) {
            changeMenuBackward();
        });
        activeRegion.bind(wheel, 'rotate', function (e) {
            wheelControll.current(e);
        });
        activeRegion.bind(playPause, 'tap', function (e) {
            togglePlayPause();
        });

        activeRegion.bind(reverse, longTapGesture, function (e) {
            seekSongReverse(e);
        });

        activeRegion.bind(forward, longTapGesture, function (e) {
            seekSongForward(e);
        });
    }, [changeMenuBackward, togglePlayPause, seekSongForward, seekSongReverse, updateActiveMenu, currentMenu]);

    return (
        <div className="wheel-container" id="wheel-container">
            <div style={{ backgroundColor: wheelColor }} className="wheel" id="wheel">
                <div className="controll" id="menu">
                    <div style={{ color: theme }}>MENU</div>
                </div>
                <div className="controll" id="forward">
                    <i style={{ color: theme }} className="fas fa-fast-forward"></i>
                </div>
                <div className="controll" id="play-pause">
                    <div>
                        <i style={{ color: theme }} className="fas fa-play"></i>
                        <i style={{ color: theme }} className="fas fa-pause"></i>
                    </div>
                </div>
                <div className="controll" id="reverse">
                    <i style={{ color: theme }} className="fas fa-fast-backward"></i>
                </div>
            </div>

            <div style={{ backgroundColor: theme }} className="blank" id="blank" onClick={() => { changeMenuForward(active, currentMenu) }}></div>
        </div>
    )
}

export default Wheel;