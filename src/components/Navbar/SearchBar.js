import React, {useRef, useState} from "react";
import {FaTimes} from "react-icons/fa";

import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import {useDebounce} from "../../hooks/DebouceHook";
import {useApi} from "../../contexts/ApiProvider";
import {useFlash} from "../../contexts/FlashProvider";
import {useUser} from "../../contexts/UserProvider";
import ShowSearch from "./ShowSearch";


export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState();
    const [activePage, setActivePage] = useState(1);
    const [selectDrop, setSelectDrop] = useState("TMDB");
    const { currentUser } = useUser();
    const flash = useFlash()
    const ref = useRef();
    const api = useApi()

    const changeSelect = (ev) => setSelectDrop(ev.target.value);

    function onChangeHandler(ev) {
        if (query.length >= 1) {
            resetSearch();
        }

        setQuery(ev.target.value);
    }

    function resetSearch() {
        setQuery("");
        setResults(undefined);
    }

    async function searchMedia(page=1) {
        if (!query || query.trim() === "" || query.length < 2) {
            return;
        }

        const response = await api.get("/autocomplete/", {
            q: query,
            selector: selectDrop,
            page: page,
        });

        if (!response.ok) {
            resetSearch();
            return flash(response.body.message, "danger");
        }

        setResults(response.body.data);
        setActivePage(page);
    }

    useDebounce(query, 300, searchMedia);
    useOnClickOutside(ref, () => resetSearch());


    return (
        <div ref={ref} className="search-bar-container">
            <div className="search-input-container">
                <input
                    className="search-input text-light"
                    placeholder="Search media/users"
                    value={query}
                    onChange={onChangeHandler}
                />
                {query &&
                    <span className="search-close-icon" onClick={resetSearch}>
                        <FaTimes/>
                    </span>
                }
                <select className="search-bar-select cu-p" value={selectDrop} onChange={changeSelect}>
                    <option className="search-option" value="TMDB">Media</option>
                    {currentUser.add_games && <option className="search-option" value="IGDB">Games</option>}
                    {currentUser.add_books && <option className="search-option" value="BOOKS">Books</option>}
                    <option className="search-option" value="users">Users</option>
                </select>

            </div>
            <ShowSearch
                query={query}
                activePage={activePage}
                results={results}
                resetSearch={resetSearch}
                searchMedia={searchMedia}
            />
        </div>
    );
}
