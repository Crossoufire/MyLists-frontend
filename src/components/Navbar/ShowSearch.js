import React, {useState} from "react";
import {Button, Dropdown} from "react-bootstrap";

import {MediaSearch} from "./MediaSearch";
import Loading from "../primitives/Loading";
import HLine from "../primitives/HLine";


export default function ShowSearch({ query, results, activePage, resetSearch, searchMedia }) {
    const [isLoading, setIsLoading] = useState(false);

    if (results === undefined && query) {
        return (
            <Dropdown className="search-autocomplete p-2">
                <Loading style={null}/>
            </Dropdown>
        );
    }

    if (results === undefined) {
        return;
    }

    if (results.items.length === 0) {
        return (
            <Dropdown className="search-autocomplete p-2">
                Sorry, no matches found.
            </Dropdown>
        );
    }

    const handleClickNext = async () => {
        setIsLoading(true);
        await searchMedia(activePage + 1);
        setIsLoading(false);
    };
    const handleClickPrevious = async () => {
        setIsLoading(true);
        await searchMedia(activePage - 1);
        setIsLoading(false);
    };


    return (
        <Dropdown className="search-autocomplete">
            <div className="d-flex justify-content-between m-t-15 align-items-baseline">
                <div className="d-flex gap-2 m-l-10">
                    <Button onClick={handleClickPrevious} disabled={activePage === 1}>Previous</Button>
                    <Button onClick={handleClickNext} disabled={results.pages === 1}>Next</Button>
                </div>
                <div className="m-r-10">
                    Page: {activePage} / {results.pages}
                </div>
            </div>
            <HLine mtop={15} mbot={5}/>
            {isLoading ?
                <div style={{height: 500}}>
                    <Loading />
                </div>
                :
                results.items.map(media => (
                    <MediaSearch
                        key={media.api_id}
                        apiId={media.api_id}
                        name={media.name}
                        mediaType={media.media_type}
                        thumbnail={media.image_cover}
                        date={media.date}
                        resetSearch={resetSearch}
                    />
                ))
            }
        </Dropdown>
    );
}