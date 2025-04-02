import React, { useState } from 'react';
import "../css/KnowMore.css"

// Renders themes menu
const KnowMore = () => {
    const [divOpen, setDivOpen] = useState(false);

    const openDiv = () => {
        setDivOpen(!divOpen);
    }

    const cssProp = divOpen ? { top: "0px" } : { top: "-542px" };

    return (
        <div style={cssProp} className="information-container">
            <div className="info-div">
                <h3>Controls</h3>
                <p>1. To unlock screen you have to press center button and to lock screen you have to press menu button in main menu.</p>
                <p>2. To play and pause music in any menu you need to press play/pause button on bottom. </p>
                <p>3. Short pressing on forward/reverse will take you to next/previous track (ONLY WHILE PLAYING) </p>
                <p>4. Long pressing on forward/reverse will seek the song in forward/reverse (ONLY WHILE PLAYING)</p>
                <p>5. To navigate between a menu items you need to rotate on track wheel</p>
                <p>6. To go to next menu or go inside a menu press center button and to go to previous menu press menu button</p>
                <p>7. Songs do play, Please checkout settings menu</p>
                <p>credits : Apple, Flaticon</p>
            </div>
            <button id="info-btn" onClick={openDiv}>Know More</button>
        </div>
    )
}

export default KnowMore;
