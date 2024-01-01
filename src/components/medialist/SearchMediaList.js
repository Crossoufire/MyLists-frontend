import React, {useState} from "react";
import {useParams} from "react-router-dom";


export default function SearchMediaList({ initSearch, condition, updateSearch }) {
    const { mediaType } = useParams();
    const [search, setSearch] = useState(initSearch);

    const handleOnKeyUp = async (ev) => {
        if (ev.key !== "Enter" || ev.target.value.length < 1) {
            return;
        }

        await updateSearch(ev.target.value);
    }

    return (
        <div className="search-bar-container">
            <div className="search-input-container">
                <input
                    className="search-input text-light"
                    placeholder={`Search in ${condition} ${mediaType}`}
                    defaultValue={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                    onKeyUp={handleOnKeyUp}
                />
            </div>
        </div>
    );
}
