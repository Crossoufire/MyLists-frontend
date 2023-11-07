import React from "react";


export default function ReleaseDate({name, start, end}) {
    return (
        <>
            <div className="fw-6" style={{color: "#8a8a8a"}}>{name}</div>
            {!end ?
                <div>{start}</div>
                :
                <div>{start}<br/>{end}</div>
            }
        </>
    );
}
