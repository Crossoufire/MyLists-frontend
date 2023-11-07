import React from "react";


export default function SearchListMedia({ search, updateSearch }) {

    const handleOnKeyUp = (ev) => {
        if (ev.key !== "Enter") {
            return;
        }

        updateSearch(ev.target.value);
    }

    return (
        <div className="search-bar-container">
            <div className="search-input-container">
                <input
                    className="search-input text-light"
                    placeholder="Search in this list"
                    defaultValue={search}
                    onKeyUp={handleOnKeyUp}
                />
            </div>
        </div>
    );
}
