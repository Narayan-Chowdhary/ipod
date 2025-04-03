import React, { useEffect, useRef } from 'react';
import "../css/Music.css"

const Music = ({ musicItems, active }) => {
    const listRef = useRef(null);
    const prevActiveRef = useRef(active);

    useEffect(() => {
        if (listRef.current) {
            const activeElement = listRef.current.children[active];
            if (activeElement) {
                let scrollDirection;
                if (active === 0 && prevActiveRef.current === musicItems.length - 1) {
                    scrollDirection = 'up';
                } else if (active === musicItems.length - 1 && prevActiveRef.current === 0) {
                    scrollDirection = 'down';
                } else {
                    scrollDirection = active < prevActiveRef.current ? 'up' : 'down';
                }

                activeElement.scrollIntoView({
                    block: scrollDirection === 'up' ? 'start' : 'end',
                    behavior: 'smooth'
                });
                
                prevActiveRef.current = active;
            }
        }
    }, [active]);

    return (
        <div className="music">
            <h3>Music</h3>
            <ul ref={listRef}>
                {musicItems.map((element, index) => (
                    active === index ? 
                        <li key={index} className="active">&nbsp;{element}</li> : 
                        <li key={index}>&nbsp;{element}</li>
                ))}
            </ul>
        </div>
    )
}

export default Music;