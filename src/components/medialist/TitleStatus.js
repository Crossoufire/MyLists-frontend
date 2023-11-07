import React from "react";


export default function TitleStatus({ status, total }) {
    return (
        <div className="fw-5 fs-22">
            {status.toUpperCase()}
            {status !== "Stats" && " ("+total+")"}
        </div>
    )
}
