import React from 'react';
import "../css/Themes.css"
import { WHEEL_COLORS } from '../constants/media';

// Color name mapping for user-friendly display
const COLOR_NAMES = {
    "rgb(255, 255, 255)": "White",
    "rgb(0, 0, 0)": "Black",
    "rgb(255, 199, 0)": "Gold",
    "rgb(128, 128, 128)": "Gray",
    "rgb(210, 210, 210)": "Silver"
};

// Render wheel color change menu
const WheelColor = ({ active }) => {
    return (
        <div className="music">
            <h2>Wheel Color Select</h2>
            <ul>
                {WHEEL_COLORS.map((color, index) => {
                    const colorName = COLOR_NAMES[color] || color;
                    return active === index ? 
                        <li key={index} className="active theme-li" style={{ color: color === 'rgb(255, 255, 255)' ? 'black' : 'white' }}>{colorName}</li> : 
                        <li className="theme-li" key={index} style={{ color: color === 'rgb(255, 255, 255)' ? 'black' : 'gray' }}>{colorName}</li>
                })}
            </ul>
        </div>
    )
}

export default WheelColor;