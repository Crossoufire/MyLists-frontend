import React, {useState} from "react";


export default function PagesInput({ isEnabled, initPage, totalPages, updatePage }) {
    const [page, setPage] = useState(initPage);

    const handlePage = (ev) => setPage(ev.target.value);

    return (
        <div className="supp-drop-container">
            {isEnabled ?
                <input
                    onBlur={() => updatePage(page)}
                    className="book-input"
                    value={page}
                    onChange={handlePage}
                />
                :
                <span>{page}</span>
            }
            /{totalPages}
        </div>
    )
}
