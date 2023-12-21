import React from "react";
import {Col} from "react-bootstrap";


export default function GlobalMediaStats({ icon, count, label }) {
    return (
        <Col sm={12} md={6} lg>
            <div className="bg-card text-center rounded-2 p-2">
                {icon}
                <div className="fs-20 fw-5 m-t-8">{count} {label}</div>
            </div>
        </Col>
    );
}
