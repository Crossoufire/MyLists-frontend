import React from "react";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import {FaClock, FaToriiGate, FaTv, FaFilm, FaUser, FaBook, FaGamepad} from "react-icons/fa";
import {Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, LabelList} from "recharts";

import {maxWidthGlobalStats} from "../utils/constants"
import {capitalize, changeValueFormat} from "../utils/functions";
import {useFetchData} from "../hooks/FetchDataHook";
import GlobalMediaStats from "../components/myListsStats/GlobalMediaStats";
import GlobalTopMediaItem from "../components/myListsStats/GlobalTopMediaItem";
import HLine from "../components/primitives/HLine";
import Loading from "../components/primitives/Loading";
import ErrorPage from "./ErrorPage";


export default function GlobalStatsPage() {
    const { apiData, loading, error } = useFetchData("/mylists_stats")

    if (error) return <ErrorPage error={error}/>;
    if (loading) return <Loading/>;

    const data = [
        {name: "series", value: apiData.total_time.series, color: "#216e7d"},
        {name: "anime", value: apiData.total_time.anime, color: "#945141"},
        {name: "movies", value: apiData.total_time.movies, color: "#8c7821"},
        {name: "games", value: apiData.total_time.games, color: "#196219"},
        {name: "books", value: apiData.total_time.books, color: "#584c6e"},
    ]

    const mediaData = [
        {icon: <FaTv size={25} className="text-series"/>, count: apiData.nb_media.series, label: "Series"},
        {icon: <FaToriiGate size={25} className="text-anime"/>, count: apiData.nb_media.anime, label: "Anime"},
        {icon: <FaFilm size={25} className="text-movies"/>, count: apiData.nb_media.movies, label: "Movies"},
        {icon: <FaGamepad size={25} className="text-games"/>, count: apiData.nb_media.games, label: "Games"},
        {icon: <FaBook size={25} className="text-books"/>, count: apiData.nb_media.books, label: "Books"},
        {icon: <FaUser size={25} className="text-grey"/>, count: apiData.nb_users, label: "Users"}
    ];

    return (
        <div className="d-flex flex-column gap-4 m-t-30 m-l-r-auto" style={{maxWidth: maxWidthGlobalStats}}>
            <div className="text-center bg-card rounded-2 p-2 fs-50">
                <FaClock size={40} className="m-b-5"/> {apiData.total_time.total}
            </div>

            <Row className="gy-3">
                {mediaData.map((media, idx) =>
                    <GlobalMediaStats
                        key={idx}
                        icon={media.icon}
                        count={media.count}
                        label={media.label}
                    />
                )}
            </Row>

            <Row className="gy-3">
                <Col xs={12} xl={3}>
                    <div className="d-flex flex-column gap-3 justify-content-between h-100">
                        <div className="bg-card text-center rounded-2 p-2 fw-5">
                            <div className="fs-16">SERIES</div>
                            <HLine color="text-series" mbot={2}/>
                            <div>{changeValueFormat(apiData.total_seasons.series[0].seasons)} seasons</div>
                            <div>{changeValueFormat(apiData.total_seasons.series[0].episodes)} episodes</div>
                        </div>
                        <div className="bg-card text-center rounded-2 p-2 fw-5">
                            <div className="fs-16">ANIME</div>
                            <HLine color="text-anime" mbot={2}/>
                            <div>{changeValueFormat(apiData.total_seasons.anime[0].seasons)} seasons</div>
                            <div>{changeValueFormat(apiData.total_seasons.anime[0].episodes)} episodes</div>
                        </div>
                        <div className="bg-card text-center rounded-2 p-2 fw-5">
                            <div className="fs-16">BOOKS</div>
                            <HLine color="text-books" mbot={2}/>
                            <div>{changeValueFormat(apiData.total_pages)} pages</div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} xl={9}>
                    <div className="bg-card p-2 rounded-2">
                        <div className="text-center fs-20">Total time per media (in hours)</div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data} margin={{left: 0}}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={{stroke: "#cccccc"}}
                                    tick={{fill:"#cccccc", fontWeight: 500}}
                                    tickFormatter={(value) => capitalize(value)}
                                />
                                <YAxis
                                    axisLine={{stroke: "#cccccc"}}
                                    tick={{fill:"#cccccc", fontWeight: 500}}
                                    tickFormatter={(value) => value/1000 + " k"}
                                />
                                <Bar dataKey="value" barSize={120}>
                                    <LabelList
                                        dataKey="value"
                                        position="insideTop"
                                        fill="#cccccc"
                                        fontWeight={500}
                                        formatter={(value) => changeValueFormat(value, "h")}
                                    />
                                    {data.map((val, idx) => <Cell key={"cell-"+idx} fill={val.color}/>)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>

            <div id="global-stat-tabs">
                <Tabs fill defaultActiveKey="series" className="bg-card m-b-20 fs-20" data-bs-theme="dark">
                    <Tab eventKey="series" title="Series">
                        <Row className="gy-3">
                            <Col xs={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Completed"
                                    textColor="text-series"
                                    dataToMap={apiData.top_media.series}
                                />
                            </Col>
                            <Col xs={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Genres"
                                    textColor="text-series"
                                    dataToMap={apiData.top_genres.series}
                                />
                            </Col>
                            <Col xs={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Actors"
                                    textColor="text-series"
                                    dataToMap={apiData.top_actors.series}
                                />
                            </Col>
                            <Col xs={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Dropped"
                                    textColor="text-series"
                                    dataToMap={apiData.top_dropped.series}
                                />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="anime" title="Anime">
                        <Row className="gy-3">
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Completed"
                                    textColor="text-anime"
                                    dataToMap={apiData.top_media.anime}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Genres"
                                    textColor="text-anime"
                                    dataToMap={apiData.top_genres.anime}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Actors"
                                    textColor="text-anime"
                                    dataToMap={apiData.top_actors.anime}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Dropped"
                                    textColor="text-anime"
                                    dataToMap={apiData.top_dropped.anime}
                                />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="movies" title="Movies">
                        <Row className="gy-3">
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Completed"
                                    textColor="text-movies"
                                    dataToMap={apiData.top_media.movies}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Genres"
                                    textColor="text-movies"
                                    dataToMap={apiData.top_genres.movies}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Actors"
                                    textColor="text-movies"
                                    dataToMap={apiData.top_actors.movies}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Directors"
                                    textColor="text-movies"
                                    dataToMap={apiData.top_directors.movies}
                                />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="games" title="Games">
                        <Row className="gy-3">
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Played"
                                    textColor="text-games"
                                    dataToMap={apiData.top_media.games}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Genres"
                                    textColor="text-games"
                                    dataToMap={apiData.top_genres.games}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Developers"
                                    textColor="text-games"
                                    dataToMap={apiData.top_developers.games}
                                />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="books" title="Books">
                        <Row className="gy-3">
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Completed"
                                    textColor="text-books"
                                    dataToMap={apiData.top_media.books}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Genres"
                                    textColor="text-books"
                                    dataToMap={apiData.top_genres.books}
                                />
                            </Col>
                            <Col sm={12} md={6} lg>
                                <GlobalTopMediaItem
                                    title="Top Authors"
                                    textColor="text-books"
                                    dataToMap={apiData.top_authors.books}
                                />
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </div>

            <div className="m-b-50"/>
        </div>
    );
}