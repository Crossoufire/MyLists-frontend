import React from "react";


export default function GenericDetails({name, value}) {
    return (
        <>
            <div className="fw-5" style={{color: "#8a8a8a"}}>{name}</div>
            <div>{value}</div>
        </>
    );
}