// Import songs
import song1 from "../static/songs/company.mp3"
import song2 from "../static/songs/onecall.mp3"
import song3 from "../static/songs/perfect.mp3"

// Import song cover images
import song1Img from "../static/moon.jpg";
import song2Img from "../static/onecall.jpg";
import song3Img from "../static/perfect.jpg";

export const songs = [
    {
        id: 0,
        name: "Company",
        url: song1,
        coverImage: song1Img
    },
    {
        id: 1,
        name: "One Call Away",
        url: song2,
        coverImage: song2Img
    },
    {
        id: 2,
        name: "Perfect",
        url: song3,
        coverImage: song3Img
    }
];

export const getSongById = (id) => {
    return songs.find(song => song.id === id);
};

export const getSongUrls = () => songs.map(song => song.url);
export const getSongNames = () => songs.map(song => song.name);
export const getSongImages = () => songs.map(song => song.coverImage); 