import React from 'react';
import "../css/Themes.css"

// Renders themes menu
const Themes = ({ active }) => {
    return (
        <div className="music">
            <h2>Theme Select</h2>
            <ul>
                {["Snow White", "Black", "USC Gold", "Space Gray", "Pearl"].map((element, index) => {
                    return active === index ? <li key={index} className="active theme-li">{element}</li> : <li className="theme-li" key={index}>{element} </li>
                })}
            </ul>
        </div>
    )
}

export default Themes;