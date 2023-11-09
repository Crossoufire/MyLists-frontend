import React, {useEffect, useState} from "react";
import {Badge, Col, Dropdown, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {FaBell, FaFilm, FaGamepad, FaLongArrowAltRight, FaToriiGate, FaTv, FaUser} from "react-icons/fa";

import {useApi} from "../../contexts/ApiProvider";
import {useFlash} from "../../contexts/FlashProvider";
import Loading from "../primitives/Loading";
import HLine from "../primitives/HLine";


export default function Notifications() {
    const api = useApi();
    const flash = useFlash();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [numberUnreadNotif, setNumberUnreadNotif] = useState(0);


    useEffect(() => {
        (async () => {
            await countNotifications();
        })();
    }, [location.pathname, fetchNotifications]);

    async function fetchNotifications() {
        setLoading(true);
        const response = await api.get("/notifications");

        if (!response.ok) {
            setLoading(false);
            return flash(response.body.message, "warning");
        }

        setNotifications(response.body.data);
        setLoading(false);
    }

    async function countNotifications() {
        const response = await api.get("/notifications/count");

        if (!response.ok) {
            return flash(response.body.message, "warning");
        }

        setNumberUnreadNotif(response.body.data);
    }


    return (
        <Dropdown onClick={async () => await fetchNotifications()} data-bs-theme="dark">
            <Dropdown.Toggle as={"div"}>
                <FaBell size={22} className="m-r-5 m-b-5"/>
                <Badge pill bg="secondary">{numberUnreadNotif}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width: 300, maxHeight: 340, overflowY: "auto"}}>
                {loading ?
                    <Dropdown.Item>
                        <Loading
                            style={null}
                            size={25}
                        />
                    </Dropdown.Item>
                    :
                    notifications.map((data, idx) =>
                        <div key={data.timestamp}>
                            <Dropdown.Item as={"div"}>
                                {data.media_type === "serieslist" &&
                                    <Link className="text-light" to={"/details/series/"+data.media_id}>
                                        <Row className="gx-0">
                                            <Col className="col-2">
                                                <FaTv className="text-series m-t-15"/>
                                            </Col>
                                            <Col className="col-10">
                                                <span className="one-line-ellipsis">{data.payload.name}</span>
                                                <div className="fs-14" style={{color: "darkgrey"}}>
                                                    S{data.payload.season}.E{data.payload.episode}
                                                    &nbsp;<FaLongArrowAltRight/>&nbsp;
                                                    {data.payload.release_date}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Link>
                                }
                                {data.media_type === "animelist" &&
                                    <Link className="text-light" to={"/details/anime/"+data.media_id}>
                                        <Row className="gx-0">
                                            <Col className="col-2">
                                                <FaToriiGate className="text-anime m-t-15"/>
                                            </Col>
                                            <Col className="col-10">
                                                <span className="one-line-ellipsis">{data.payload.name}</span>
                                                <div className="fs-14" style={{color: "darkgrey"}}>
                                                    S{data.payload.season}.E{data.payload.episode}
                                                    &nbsp;<FaLongArrowAltRight/>&nbsp;
                                                    {data.payload.release_date}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Link>
                                }
                                {data.media_type === "movieslist" &&
                                    <Link className="text-light" to={"/details/movies/"+data.media_id}>
                                        <Row className="gx-0">
                                            <Col className="col-2">
                                                <FaFilm className="text-movies m-t-15"/>
                                            </Col>
                                            <Col className="col-10">
                                                <span className="one-line-ellipsis">{data.payload.name}</span>
                                                <div className="fs-14" style={{color: "darkgrey"}}>
                                                    Release
                                                    &nbsp;<FaLongArrowAltRight/>&nbsp;
                                                    {data.payload.release_date}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Link>
                                }
                                {data.media_type === "gameslist" &&
                                    <Link className="text-light" to={"/details/games/"+data.media_id}>
                                        <Row className="gx-0">
                                            <Col className="col-2">
                                                <FaGamepad className="text-games m-t-15"/>
                                            </Col>
                                            <Col className="col-10">
                                                <span className="one-line-ellipsis">{data.payload.name}</span>
                                                <div className="fs-14" style={{color: "darkgrey"}}>
                                                    Release
                                                    &nbsp;<FaLongArrowAltRight/>&nbsp;
                                                    {data.payload.release_date}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Link>
                                }
                                {!data.media_type &&
                                    <Link className="text-light" to={"/profile/"+data.payload.username}>
                                        <Row className="gx-0">
                                            <Col className="col-2">
                                                <FaUser className="text-grey"/>
                                            </Col>
                                            <Col className="col-10">
                                                <span className="one-line-ellipsis">{data.payload.message}</span>
                                            </Col>
                                        </Row>
                                    </Link>
                                }
                            </Dropdown.Item>
                            {idx !== notifications.length -1 && <HLine mtop={0} mbot={0} color="white"/>}
                        </div>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}