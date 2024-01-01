import React from "react";
import {Link} from "react-router-dom";
import {Col, Container, Image, Row} from "react-bootstrap";
import {FaEnvelope} from "react-icons/fa";

import {mail} from "../../utils/constants";
import HLine from "../primitives/HLine";


export default function Footer() {
    return (
        <footer className="footer-container m-t-50">
            <Container className="p-3 footer-max-width">
                <Row className="mb-2 gy-4 text-center text-sm-start">
                    <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                        <h5 className="dis-inline text-uppercase footer-color">
                            <Image src="/favicon.ico" width={18} alt="favicon"/>
                            <b>&nbsp;MyLists.info</b>
                        </h5>
                        <p>
                            Create your media lists, see how much time you spent, follow your friends and compare with them.
                            Add favorites, comments, re-watch and gain levels to get to the top of the Hall of Fame.
                        </p>
                        <a className="text-light" href={"mailto:" + mail}><b><FaEnvelope/> Contact us</b></a>
                    </Col>
                    <Col xs={12} sm={3} md={3} lg={3} xl={3}>
                        <h5 className="text-uppercase footer-color">
                            <b>Powered by</b>
                        </h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="https://flask.palletsprojects.com/" className="text-light" rel="noreferrer" target="_blank">Flask</a></li>
                            <li><a href="https://reactjs.org/" className="text-light" rel="noreferrer" target="_blank">React</a></li>
                            <li><a href="https://www.themoviedb.org/" className="text-light" rel="noreferrer" target="_blank">TMDB</a></li>
                            <li><a href="https://www.igdb.com/" className="text-light" rel="noreferrer" target="_blank">IGDB</a></li>
                            <li><a href="https://books.google.com/" className="text-light" rel="noreferrer" target="_blank">Google Books</a></li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={3} md={3} lg={3} xl={3}>
                        <h5 className="text-uppercase footer-color">
                            <b>MyLists Info</b>
                        </h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="https://github.com/Crossoufire/MyLists" className="text-light" rel="noreferrer" target="_blank">Github</a></li>
                            <li><Link to="/about" className="text-light" rel="noreferrer" target="_blank">About</Link></li>
                            <li><Link to="/privacy_policy" className="text-light" rel="noreferrer" target="_blank">Privacy Policy</Link></li>
                            <li><Link className="text-light" to="/levels/media_levels">Media levels data</Link></li>
                            <li><Link className="text-light" to="/levels/profile_levels">Profile borders data</Link></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <HLine mtop={0} mbot={0}/>
            <div className="text-center p-2">© 2019-2023 Copyright: MyLists.info</div>
        </footer>
    );
}
