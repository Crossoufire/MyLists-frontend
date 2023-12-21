import React, {Fragment} from "react";
import Link from "next/link";


export default function MapDetails({ name, valueList, mediaType, job, asJoin }) {
    const renderLink = (value) => (
        <Link key={value} href={`/persons/${mediaType}/${job}/${value}`} className="text-light">
            <div><u>{value}</u></div>
        </Link>
    );
    const renderValue = (value, idx) => (
        <Fragment key={value}>
            {asJoin ? <span>{value}{idx !== valueList.length - 1 && ", "}</span> : <div>{value}</div>}
        </Fragment>
    );


    return (
        <>
            <div className="fw-6" style={{ color: "#8a8a8a" }}>{name}</div>
            {valueList.map((value, idx) =>
                mediaType && job && value !== "Unknown" ? renderLink(value) : renderValue(value, idx)
            )}
        </>
    );
}
