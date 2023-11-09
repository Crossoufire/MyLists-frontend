import React from "react";
import {NavDropdown} from "react-bootstrap";
import {FaBook, FaFilm, FaGamepad, FaToriiGate, FaTv} from "react-icons/fa";

import NavMediaItem from "./NavMediaItem";


export default function NavMediaDrop({ currentUser }) {
    const username = currentUser.username;

    const itemsList = [
        {to: `/list/series/${username}`, icon: <FaTv className="text-series"/>, text: "SeriesList"},
        {to: `/list/movies/${username}`, icon: <FaFilm className="text-movies"/>, text: "MoviesList"},
    ];

    if (currentUser.add_anime) {
        itemsList.push(
            {to: `/list/anime/${username}`, icon: <FaToriiGate className="text-anime"/>, text: "AnimeList"},
        );
    }
    if (currentUser.add_games) {
        itemsList.push(
            {to: `/list/games/${username}`, icon: <FaGamepad className="text-games"/>, text: "GamesList"},
        );
    }
    if (currentUser.add_books) {
        itemsList.push(
            {to: `/list/books/${username}`, icon: <FaBook className="text-books"/>, text: "BooksList"}
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
