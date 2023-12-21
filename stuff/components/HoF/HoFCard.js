import {Card, Col, Image, Row} from "react-bootstrap";
import Link from "next/link";
import React from "react";


export default function HoFCard({ currentUser, item }) {
    const bg = (currentUser.id === item.id) ? "bg-dark" : "bg-card";

    return (
        <Card key={item.username} className={`${bg} m-b-20 text-light`}>
            <Card.Body className="p-2">
                <Row className="gy-3">
                    <Col xs={3} sm={3} xl={1}>
                        <div className="d-flex flex-column align-items-center justify-content-center fs-20 h-100 fw-5">
                            #{item.rank}
                        </div>
                    </Col>
                    <Col xs={9} sm={9} xl={4}>
                        <div className="position-relative">
                            <Image
                                className="hof-profile-img"
                                src={item.profile_image}
                                alt={"profile"}
                            />
                            <Image
                                height={162}
                                width={162}
                                src={item.profile_border}
                                alt={"frame"}
                            />
                            <div className="hof-profile-level">
                                {item.profile_level}
                            </div>
                            <h6 className="hof-profile-data text-center">
                                <Link href={`/profile/${item.username}`} className="text-light">
                                    <u>{item.username}</u>
                                </Link>
                            </h6>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md lg xl>
                        <div className="d-flex flex-row flex-wrap text-center row-cols-5 align-items-center fw-5 h-100">
                            <div className="d-flex flex-column justify-content-evenly h-100">
                                <div>Series</div>
                                <Link className="text-light" href={`/list/series/${item.username}`}>
                                    <div><Image src={item.series_image} alt="series-grade"/></div>
                                    <div>{item.series_level}</div>
                                </Link>
                            </div>
                            <div className="d-flex flex-column justify-content-evenly h-100">
                                <div>Anime</div>
                                {item.add_anime ?
                                    <Link className="text-light" href={`/list/anime/${item.username}`}>
                                        <div><Image src={item.anime_image} alt="anime-grade"/></div>
                                        <div>{item.anime_level}</div>
                                    </Link>
                                    :
                                    <div className="d-flex justify-content-center align-items-center" style={{height: 66}}>
                                        Disabled
                                    </div>
                                }
                            </div>
                            <div className="d-flex flex-column justify-content-evenly h-100">
                                <div>Movies</div>
                                <Link className="text-light" href={`/list/movies/${item.username}`}>
                                    <div><Image src={item.movies_image} alt="movies-grade"/></div>
                                    <div>{item.movies_level}</div>
                                </Link>
                            </div>
                            <div className="d-flex flex-column justify-content-evenly h-100">
                                <div>Books</div>
                                {item.add_books ?
                                    <Link className="text-light" href={`/list/books/${item.username}`}>
                                        <div><Image src={item.books_image} alt="books-grade"/></div>
                                        <div>{item.books_level}</div>
                                    </Link>
                                    :
                                    <div className="d-flex justify-content-center align-items-center" style={{height: 66}}>
                                        Disabled
                                    </div>
                                }
                            </div>
                            <div className="d-flex flex-column justify-content-evenly h-100">
                                <div>Games</div>
                                {item.add_games ?
                                    <Link className="text-light" href={`/list/games/${item.username}`}>
                                        <div><Image src={item.games_image} alt="games-grade"/></div>
                                        <div>{item.games_level}</div>
                                    </Link>
                                    :
                                    <div className="d-flex justify-content-center align-items-center" style={{height: 66}}>
                                        Disabled
                                    </div>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}