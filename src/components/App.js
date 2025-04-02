import React, { useState, useEffect, useCallback, useRef } from 'react';
 
import '../css/App.css';
 import Case from './Case.js';
  import { SONGS, THEMES, WHEEL_COLORS } from '../constants/media';
 
 import { WALLPAPERS } from '../constants/media';

const STORAGE_KEY = 'ipod_settings';

const getInitialState = () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
        const parsedState = JSON.parse(savedState);
         return {
            ...parsedState,
            audio: new Audio(parsedState.songUrl),
            theme: THEMES[parsedState.themeIndex || 0],
            wheelColor: WHEEL_COLORS[parsedState.wheelColorIndex || 0]
        };
    }
    
     return {
        active: 0,
        menuItems: ["Now Playing", "Music", "Games", "Settings"],
        musicItems: ["All Songs", "Artist", "Albums"],
        songItemsUrl: SONGS.map(song => song.url),
        songImgItemsUrl: SONGS.map(song => song.cover),
        wallpaperItems: WALLPAPERS,
        songItems: SONGS.map(song => song.name),
        songIndex: 0,
        lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 },
        menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] },
        currentMenu: -2,
        navigationStack: [],
        songUrl: SONGS[0].url,
        playing: false,
        theme: THEMES[0],
        themeIndex: 0,
        audio: new Audio(SONGS[0].url),
        songImgUrl: SONGS[0].cover,
        wheelColor: WHEEL_COLORS[0],
        wheelColorIndex: 0,
        wallpaper: 0,
        noty: false,
        notifyText: "Wallpaper Changed",
    };
};

const App = () => {
    const [state, setState] = useState(getInitialState);
    const pendingSongChange = useRef(null);
    const audioRef = useRef(null);

     useEffect(() => {
        const stateToSave = { ...state };
         delete stateToSave.audio;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [state]);

     const handleSongEnd = useCallback(() => {
        setState(prevState => {
            const nextSongIndex = (prevState.songIndex + 1) % prevState.songItemsUrl.length;
            const nextSong = prevState.songItemsUrl[nextSongIndex];
            
             if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current.src = '';
            }
             
            const newAudio = new Audio(nextSong);
            audioRef.current = newAudio;
             
            newAudio.addEventListener('canplaythrough', () => {
                setState(currentState => ({
                    ...currentState,
                    songIndex: nextSongIndex,
                    songUrl: nextSong,
                    songImgUrl: currentState.songImgItemsUrl[nextSongIndex],
                    audio: newAudio,
                    playing: true
                }));
                
                newAudio.play().catch(error => {
                    console.error('Error playing next song:', error);
                    setState(currentState => ({ ...currentState, playing: false }));
                });
            });
            
            return prevState;
        });
    }, []);

    useEffect(() => {
        const audio = state.audio;
        audio.addEventListener('ended', handleSongEnd);

        return () => {
            audio.removeEventListener('ended', handleSongEnd);
            audio.pause();
            audio.currentTime = 0;
            audio.src = '';
        };
    }, [state.audio, handleSongEnd]);
 
    const changeMenuForward = (id, fromMenu) => {
        const navigationStack = state.navigationStack.slice();

        if (fromMenu !== -2 && fromMenu !== -1 && fromMenu !== 1 && fromMenu !== 4 && fromMenu !== 3 && fromMenu !== 8 && fromMenu !== 9 && fromMenu !== 0 && fromMenu !== 7 && fromMenu !== 10) {
            return;
        }

        if (fromMenu === -2) {
            navigationStack.push(state.currentMenu);
            setState({ ...state, currentMenu: -1, navigationStack: navigationStack, active: 0 });
            return;
        }

        if (fromMenu === -1) {
            navigationStack.push(state.currentMenu);
            setState({ ...state, currentMenu: id, navigationStack: navigationStack, active: 0 });
            return;
        }

        if (fromMenu === 7 || fromMenu === 0) {
            togglePlayPause();
            return;
        }

        if (fromMenu === 8) {
            setTheme(id);
            return;
        }

        if (fromMenu === 9) {
            setWheelColor(id);
            return;
        }

        if (fromMenu === 10) {
            setWallpaper(id);
            return;
        }

        navigationStack.push(state.currentMenu);

        if (fromMenu === 4) {
            chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
            return;
        }

        const currentMenuID = state.menuMapping[fromMenu][id];
        setState({ ...state, currentMenu: currentMenuID, navigationStack: navigationStack, active: 0 });
    };
 
    const setNoty = () => {
        setState({ ...state, noty: false });
        return;
    };
 
    const togglePlayPause = () => {
        if (state.playing) {
            state.audio.pause();
        } else {
            state.audio.play().catch(error => {
                console.error('Error playing song:', error);
                setState(prevState => ({ ...prevState, playing: false }));
            });
        }
        setState(prevState => ({ ...prevState, playing: !prevState.playing }));
    };
 
    const changeMenuBackward = () => {
        const navigationStack = state.navigationStack.slice();
        if (navigationStack.length === 0) {
            return;
        }
        const previousMenu = navigationStack.pop();
        setState({ ...state, currentMenu: previousMenu, navigationStack: navigationStack, active: 0 });
    };
 
    const updateActiveMenu = (direction, menu) => {
        if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 3 && menu !== 9 && menu !== 10) {
            return;
        }
        let min = 0;
        let max = 0;

        max = state.lengthMenuKey[menu];

        if (direction === 1) {
            if (state.active >= max) {
                setState({ ...state, active: min });
            } else {
                setState({ ...state, active: state.active + 1 });
            }
        } else {
            if (state.active <= min) {
                setState({ ...state, active: max });
            } else {
                setState({ ...state, active: state.active - 1 });
            }
        }
    };
 
    const seekSongForward = () => {
        if (pendingSongChange.current) {
            clearTimeout(pendingSongChange.current);
        }

        pendingSongChange.current = setTimeout(() => {
            setState(prevState => {
                const nextSongIndex = (prevState.songIndex + 1) % prevState.songItemsUrl.length;
                const nextSong = prevState.songItemsUrl[nextSongIndex];
                
                // Clean up current audio
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    audioRef.current.src = '';
                }
                 
                const newAudio = new Audio(nextSong);
                audioRef.current = newAudio;
                 
                newAudio.addEventListener('canplaythrough', () => {
                    setState(currentState => ({
                        ...currentState,
                        songIndex: nextSongIndex,
                        songUrl: nextSong,
                        songImgUrl: currentState.songImgItemsUrl[nextSongIndex],
                        audio: newAudio,
                        playing: true
                    }));
                    
                    newAudio.play().catch(error => {
                        console.error('Error playing next song:', error);
                        setState(currentState => ({ ...currentState, playing: false }));
                    });
                });
                
                return prevState;
            });
        }, 100); 
    };
 
    const seekSongReverse = () => {
        if (pendingSongChange.current) {
            clearTimeout(pendingSongChange.current);
        }

        pendingSongChange.current = setTimeout(() => {
            setState(prevState => {
                const prevSongIndex = (prevState.songIndex - 1 + prevState.songItemsUrl.length) % prevState.songItemsUrl.length;
                const prevSong = prevState.songItemsUrl[prevSongIndex];
                
                // Clean up current audio
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    audioRef.current.src = '';
                }
                 
                const newAudio = new Audio(prevSong);
                audioRef.current = newAudio;
                  
                newAudio.addEventListener('canplaythrough', () => {
                    setState(currentState => ({
                        ...currentState,
                        songIndex: prevSongIndex,
                        songUrl: prevSong,
                        songImgUrl: currentState.songImgItemsUrl[prevSongIndex],
                        audio: newAudio,
                        playing: true
                    }));
                    
                    newAudio.play().catch(error => {
                        console.error('Error playing previous song:', error);
                        setState(currentState => ({ ...currentState, playing: false }));
                    });
                });
                
                return prevState;
            });
        }, 100);  
    };

    // FUNCTION FOR : SET THEME
    const setTheme = (id) => {
        setState(prevState => ({
            ...prevState,
            theme: THEMES[id],
            themeIndex: id,
            currentMenu: 3,
            navigationStack: prevState.navigationStack.slice(0, -1)
        }));
    };

    // FUNCTION FOR : SET WHEEL COLOR
    const setWheelColor = (id) => {
        setState(prevState => ({
            ...prevState,
            wheelColor: WHEEL_COLORS[id],
            wheelColorIndex: id,
            currentMenu: 3,
            navigationStack: prevState.navigationStack.slice(0, -1)
        }));
    };

    // FUNCTION FOR : SET WALLPAPER
    const setWallpaper = (id) => {
        setState(prevState => ({
            ...prevState,
            wallpaper: id,
            currentMenu: 3,
            navigationStack: prevState.navigationStack.slice(0, -1),
            noty: true
        }));
    };

    // FUNCTION FOR : CHANGE PLAYING SONG FROM MUSIC MENU
    const chagePlayingSongFromMusicMenu = (id, navigationStack, fromMenu) => {
        setState(prevState => {
            const nextSong = prevState.songItemsUrl[id];
            
            // Clean up current audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current.src = '';
            }
            
            // Create new audio element
            const newAudio = new Audio(nextSong);
            audioRef.current = newAudio;
            
            // Wait for new audio to load before playing
            newAudio.addEventListener('canplaythrough', () => {
                setState(currentState => ({
                    ...currentState,
                    songIndex: id,
                    songUrl: nextSong,
                    songImgUrl: currentState.songImgItemsUrl[id],
                    audio: newAudio,
                    playing: true,
                    currentMenu: 7,
                    navigationStack: navigationStack
                }));
                
                newAudio.play().catch(error => {
                    console.error('Error playing song:', error);
                    setState(currentState => ({ ...currentState, playing: false }));
                });
            });
            
            return prevState;
        });
    };

    return (
        <div className="app">
            <Case
                active={state.active}
                updateActiveMenu={updateActiveMenu}
                currentMenu={state.currentMenu}
                changeMenuBackward={changeMenuBackward}
                changeMenuForward={changeMenuForward}
                menuItems={state.menuItems}
                musicItems={state.musicItems}
                togglePlayPause={togglePlayPause}
                songItems={state.songItems}
                playing={state.playing}
                songIndex={state.songIndex}
                theme={state.theme}
                audio={state.audio}
                songUrl={state.songUrl}
                songImgUrl={state.songImgUrl}
                seekSongForward={seekSongForward}
                seekSongReverse={seekSongReverse}
                wheelColor={state.wheelColor}
                wallpaper={state.wallpaper}
                wallpaperItems={state.wallpaperItems}
                noty={state.noty}
                setNoty={setNoty}
                notifyText={state.notifyText}
                themeIndex={state.themeIndex}
                wheelColorIndex={state.wheelColorIndex}
                wallpaperIndex={state.wallpaper}
            />
        </div>
    );
}

export default App;
