import {
    FaAngry,
    FaBook, FaFilm,
    FaFrown,
    FaGamepad,
    FaGrinAlt,
    FaGrinStars,
    FaPoop,
    FaSmile,
    FaToriiGate, FaTv
} from "react-icons/fa";


export function zeroPad(value) {
    if (value) {
        return String(value).padStart(2, "0");
    }

    return "00"
}

export function capitalize(str) {
    if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export function createLocalDate(date_) {
    if (date_) {
        let tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;
        let localDate = new Date(date_).toLocaleString("en-GB", {timeZone: tz});
        let d = new Date(date_);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return `${localDate.slice(0, 2)} ${month[d.getMonth()]} ${d.getFullYear()} at ${localDate.slice(11, 17)}`
    }
}

export function formatTime(minutes) {
    if (isNaN(minutes)) {
        return "--";
    }

    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    return hours + "h" + (remainingMinutes < 10 ? "0" : "") + remainingMinutes.toFixed(0);
}

export function getUserMetric(isFeeling, userData) {
    const name = isFeeling ? "Feeling" : "Score";
    const value = isFeeling ? userData.feeling : userData.score;

    return {name, value};
}

export function getMetricValues(name) {
    if (name === "Feeling") {
        return [
            {value: null, icon: "---"},
            {value: 0, icon: <FaPoop className="m-b-5" color="saddlebrown"/>},
            {value: 1, icon: <FaAngry className="m-b-5" color="indianred"/>},
            {value: 2, icon: <FaFrown className="m-b-5" color="#d0a141"/>},
            {value: 3, icon: <FaSmile className="m-b-5" color="darkseagreen"/>},
            {value: 4, icon: <FaGrinAlt className="m-b-5" color="#59a643"/>},
            {value: 5, icon: <FaGrinStars className="m-b-5" color="#019101"/>},
        ]
    }

    return ["---", 0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
}

export function getPlaytimeValues() {
    return [0, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 225, 250, 275, 300,
        350, 400, 450, 500, 550, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000,
        9000, 10000]
}

export function getRedoValues() {
    return [...Array(11).keys()];
}

export function getMediaIcon(mediaType, size) {
    if (mediaType === "series") {
        return <FaTv className="text-series" size={size}/>
    }
    else if (mediaType === "anime") {
        return <FaToriiGate className="text-anime" size={size}/>
    }
    else if (mediaType === "movies") {
        return <FaFilm className="text-movies" size={size}/>
    }
    else if (mediaType === "games") {
        return <FaGamepad className="text-games" size={size}/>
    }
    else if (mediaType === "books") {
        return <FaBook className="text-books" size={size}/>
    }
}

export function changeValueFormat(value, label="") {
    if (value > 10000) {
        return `${value.toLocaleString().replace(/,/g, " ")} ${label}`;
    } else {
        return `${value} ${label}`;
    }
}
