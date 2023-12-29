import React from "react";


export default function SearchMediaList({ search, updateSearch, mediaType }) {
    const handleOnKeyUp = (ev) => {
        if (ev.key !== "Enter" || ev.target.value.length < 1) {
            return;
        }
        updateSearch(ev.target.value);
    }

    return (
        <div className="search-bar-container">
            <div className="search-input-container">
                <input
                    className="search-input text-light"
                    placeholder={`Search in ${mediaType}`}
                    defaultValue={search}
                    onKeyUp={handleOnKeyUp}
                />
            </div>
        </div>
    );
}
