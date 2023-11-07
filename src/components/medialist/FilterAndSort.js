import React from "react";
import FilterSortDrop from "./FilterSortDrop";


export default function FilterAndSort({ mediaType, paginateData, updateLang, updateGenre, updateSorting }) {
    if (["Stats", "Search"].includes(paginateData.status)) {
        return;
    }


    return (
        <div className="d-flex gap-4 align-items-center">
            {mediaType === "movies" &&
                <FilterSortDrop
                    name="Lang"
                    activeData={paginateData.lang}
                    allData={["All", "en", "fr"]}
                    updateFunction={updateLang}
                />
            }
            <FilterSortDrop
                name="Genres"
                activeData={paginateData.genre}
                allData={paginateData.all_genres}
                updateFunction={updateGenre}
            />
            <FilterSortDrop
                name="Sort"
                activeData={paginateData.sorting}
                allData={paginateData.all_sorting}
                updateFunction={updateSorting}
            />
        </div>
    );
}
