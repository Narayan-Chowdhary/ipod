import React, { useState, useEffect } from 'react';
import "../css/Navbar.css"
import BatImg from "../static/battery.png"

// Renders navbar
const Navbar = ({ playing, noty, setNoty, notifyText }) => {
    const [time, setTime] = useState(getCurrentTime());

    // Get current time in string
    function getCurrentTime() {
        const today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        if (today.getMinutes() < 10) {
            time = today.getHours() + ":0" + today.getMinutes();
        }
        return time;
    }

    useEffect(() => {
        if (noty === true) {
            return;
        }
        // set an interval of 60 seconds to update time
        const stateId = setInterval(() => {
            setTime(getCurrentTime());
        }, 60000);

        return () => {
            if (noty !== true) {
                clearInterval(stateId);
            }
        };
    }, [noty]);

    useEffect(() => {
        if (noty === true) {
            setTimeout(() => {
                setNoty();
            }, 1000);
        }
    }, [noty, setNoty]);

    return (
        <div className="bar">
            {<h5 className="heading">iPod <i className="fas fa-wifi"></i></h5>}
            {noty === true && <h5 className="notification">{notifyText}</h5>}
            {noty === false && <h3 className="time">{time}</h3>}
            {<div className="right-container-nav">
                {playing ? <h5 className="play-pause-nav"><i className="fas fa-play"></i></h5> : <h5 className="play-pause-nav"><i className="fas fa-pause"></i> </h5>}
                <img className="battery" src={BatImg} alt="Battery" />
            </div>}
        </div>
    )
}

export default Navbar;