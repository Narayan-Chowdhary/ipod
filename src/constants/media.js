import song1 from "../static/songs/company.mp3"
import song2 from "../static/songs/onecall.mp3"
import song3 from "../static/songs/perfect.mp3"
import song1Img from "../static/moon.jpg"
import song2Img from "../static/onecall.jpg"
import song3Img from "../static/perfect.jpg"
import Wallpaper1 from "../static/wallpaper1.jpg"
import Wallpaper2 from "../static/wallpaper2.jpg"
import Wallpaper3 from "../static/wallpaper3.jpg"

export const SONGS = [
    {
        id: 0,
        name: "Company",
        url: song1,
        cover: song1Img
    },
    {
        id: 1,
        name: "One Call Away",
        url: song2,
        cover: song2Img
    },
    {
        id: 2,
        name: "Perfect",
        url: song3,
        cover: song3Img
    }
];

export const WALLPAPERS = [
    Wallpaper1,
    Wallpaper2,
    Wallpaper3
];

export const THEMES = [
    "rgb(210, 210, 210)",
    "rgb(0, 0, 0)", 
    "rgb(255, 199, 0)", 
    "rgb(52, 52, 52)", 
    "rgb(255, 255, 255)"
];

export const WHEEL_COLORS = [
    "rgb(255, 255, 255)",  // White
    "rgb(0, 0, 0)",       // Black
    "rgb(255, 199, 0)",   // Gold
    "rgb(128, 128, 128)", // Gray
    "rgb(255, 255, 255)"  // White
]; 