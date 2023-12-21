import React from "react";
import {NavDropdown} from "react-bootstrap";
import {FaBook, FaFilm, FaGamepad, FaToriiGate, FaTv} from "react-icons/fa";

import NavMediaItem from "./NavMediaItem";


export default function NavMediaDrop({ currentUser }) {
    const username = currentUser.username;

    const itemsList = [
        {href: `/list/series/${username}`, icon: <FaTv className="text-series"/>, text: "SeriesList"},
        {href: `/list/movies/${username}`, icon: <FaFilm className="text-movies"/>, text: "MoviesList"},
    ];

    if (currentUser.add_anime) {
        itemsList.push(
            {href: `/list/anime/${username}`, icon: <FaToriiGate className="text-anime"/>, text: "AnimeList"},
        );
    }
    if (currentUser.add_games) {
        itemsList.push(
            {href: `/list/games/${username}`, icon: <FaGamepad className="text-games"/>, text: "GamesList"},
        );
    }
    if (currentUser.add_books) {
        itemsList.push(
            {href: `/list/books/${username}`, icon: <FaBook className="text-books"/>, text: "BooksList"}
        );
    }


    return (
        <NavDropdown title="MyLists" className="m-r-10" data-bs-theme="dark">
            {itemsList.map((item, idx) => (
                <NavMediaItem
                    key={idx}
                    {...item}
                />
            ))}
        </NavDropdown>
    )
}
