import React from "react";
import {Col, Row} from "react-bootstrap";
import HLine from "../primitives/HLine";


export default function GlobalTopMediaItem({ title, textColor, dataToMap }) {
    return (
        <div className="bg-card p-3 rounded-2">
            <div className="fs-18 fw-5">{title}</div>
            <HLine color={textColor}/>
            <Row className="gy-3">
                {dataToMap.map(media =>
                    <React.Fragment key={media.info}>
                        <Col className="col-3">
                            <div className="text-center">{media.quantity}</div>
                        </Col>
                        <Col className="col-9">
                            <div className="one-line-ellipsis" title={media.info}>{media.info}</div>
                        </Col>
                    </React.Fragment>
                )}
            </Row>
        </div>
    );
}
