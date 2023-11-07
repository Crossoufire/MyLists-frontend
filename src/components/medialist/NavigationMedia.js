import React from "react";
import {Link} from "react-router-dom";
import {FaBook, FaFilm, FaGamepad, FaToriiGate, FaTv, FaUser} from "react-icons/fa";


export default function NavigationMedia({ username, addAnime, addBooks, addGames, mediaType }) {
    const menuItems = [
        {url: "/profile", media: "user", icon: FaUser},
        {url: "/list/series", media: "series", icon: FaTv},
        {url: "/list/anime", media: "anime", icon: FaToriiGate, cond: addAnime},
        {url: "/list/movies", media: "movies", icon: FaFilm},
        {url: "/list/books", media: "books", icon: FaBook, cond: addBooks},
        {url: "/list/games", media: "games", icon: FaGamepad, cond: addGames}
    ];

    return (
        <div className="d-flex flex-row gap-3">
            {menuItems.filter(item => item.cond !== false).map(({ icon: Icon, ...item }, idx) => (
                <Link key={idx} to={`${item.url}/${username}`}>
                    <div className={"text-"+item.media + (mediaType === item.media ? " active-left" : "")}>
                        {<Icon size={25}/>}
                    </div>
                </Link>
            ))}
        </div>
    )
}
