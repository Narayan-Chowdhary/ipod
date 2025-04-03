import React, { useEffect, useRef } from 'react';
import "../css/Menu.css"
import game from "../static/game.jpg"
import music from "../static/music.jpg"
import settings from "../static/settings.png"

// Renders main menu
const Menu = ({ active, menuItems, songImgUrl }) => {
    const listRef = useRef(null);
    const prevActiveRef = useRef(active);

    useEffect(() => {
        if (listRef.current) {
            const activeElement = listRef.current.children[active];
            if (activeElement) {
                // Determine scroll direction based on previous active index
                let scrollDirection;
                if (active === 0 && prevActiveRef.current === menuItems.length - 1) {
                    // Wrapping from last to first
                    scrollDirection = 'up';
                } else if (active === menuItems.length - 1 && prevActiveRef.current === 0) {
                    // Wrapping from first to last
                    scrollDirection = 'down';
                } else {
                    scrollDirection = active < prevActiveRef.current ? 'up' : 'down';
                }
                
                // Scroll with different behavior based on direction
                activeElement.scrollIntoView({ 
                    block: scrollDirection === 'up' ? 'start' : 'end',
                    behavior: 'smooth'
                });
                
                // Update previous active index
                prevActiveRef.current = active;
            }
        }
    }, [active]);

    return (
        <div className="menu-container">
            <div className="menu">
                <h3>Menu</h3>
                <ul ref={listRef}>
                    {menuItems.map((element, index) => {
                        return active === index ? <li key={index} className="active">&nbsp;{element}</li> : <li key={index}>&nbsp;{element}</li>
                    })}
                </ul>
            </div>
            <div className="leaf">
                {active === 0 && <img className="leaf-img" src={songImgUrl} alt=""></img>}
                {active === 1 && <img className="leaf-img" src={music} alt=""></img>}
                {active === 2 && <img className="leaf-img" src={game} alt=""></img>}
                {active === 3 && <img className="leaf-img" src={settings} alt=""></img>}
            </div>
        </div>
    )
}

export default Menu;