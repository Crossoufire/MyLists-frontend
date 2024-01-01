import React from "react";


export default function TitleStatus({ status, total, title = null }) {
    return (
        <div className="fw-5 fs-22">
            {title ? title.toUpperCase() : status.toUpperCase()}
            {(total !== 0) ? ` (${total})` : ""}
        </div>
    );
}
