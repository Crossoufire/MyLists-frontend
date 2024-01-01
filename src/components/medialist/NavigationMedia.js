import React from "react";
import {Link} from "react-router-dom";
import {FaBook, FaFilm, FaGamepad, FaToriiGate, FaTv, FaUser} from "react-icons/fa";


const NavigationMedia = ({ userData, mediaType }) => {
    const menuItems = [
        {url: "/profile", media: "user", icon: FaUser},
        {url: `/list/series`, media: "series", icon: FaTv},
        {url: `/list/anime`, media: "anime", icon: FaToriiGate, cond: userData.add_anime},
        {url: `/list/movies`, media: "movies", icon: FaFilm},
        {url: `/list/books`, media: "books", icon: FaBook, cond: userData.add_books},
        {url: `/list/games`, media: "games", icon: FaGamepad, cond: userData.add_games}
    ];

    return (
        <div className="d-flex flex-row gap-3">
            {menuItems.filter(item => item.cond !== false).map(({ icon: Icon, ...item }) =>
                <Link key={item.url} to={`${item.url}/${userData.username}`}>
                    <div className={`text-${item.media} ${mediaType === item.media ? "active-left" : ""}`}>
                        {<Icon size={25}/>}
                    </div>
                </Link>
            )}
        </div>
    );
};


export default NavigationMedia
