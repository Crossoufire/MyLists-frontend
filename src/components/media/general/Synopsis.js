import React from "react";

import HLine from "../../primitives/HLine";


export default function Synopsis({ synopsis, tagLine }) {
    return (
        <div>
            <h4>Synopsis</h4>
            <HLine/>
            <div className="fs-18">{synopsis}</div>

            {tagLine &&
                <footer className="blockquote-footer fs-18 m-t-15 m-b-0">
                    {tagLine}
                </footer>
            }
        </div>
    )
}
