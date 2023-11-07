import {useRef, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";

import HLine from "../primitives/HLine";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";


export default function TrendMedia({ media, idx, addMediaToDb }) {
    const summaryRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(summaryRef, () => setIsOpen(false));


    return (
        <Card className="bg-card text-light">
            <Row className="gx-0">
                <Col xs={5} xl={5}>
                    <Card.Img
                        className="cu-p"
                        src={media.poster_path}
                        alt={media.display_name}
                        onClick={() => addMediaToDb(media.media_type, media.api_id)}
                    />
                </Col>
                <Col xs={7} xl={7}>
                    <Card.Body className="p-t-10">
                        <Card.Title className="cu-p text-light" onClick={() => addMediaToDb(media.media_type, media.api_id)}>
                            <div className="two-lines-ellipsis">{media.display_name}</div>
                            <div className="fs-13 text-grey m-t-5"><i>{media.release_date}</i></div>
                        </Card.Title>
                        <HLine/>
                        <Card.Text ref={summaryRef} className={`${isOpen ? "text-light" : 
                            "trend-summary-ellipsis text-light"} cu-p`} onClick={() =>setIsOpen(!isOpen)}>
                            {media.overview}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
            <p className="trends-card-hashtag fs-20">#{idx + 1}</p>
        </Card>
    )
}