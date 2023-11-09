import React from "react";
import {NavLink} from "react-router-dom";
import {Col, Container, Image, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {FaCog, FaSignOutAlt, FaUser} from "react-icons/fa";

import {useUser} from "../../contexts/UserProvider";
import Loading from "../primitives/Loading";
import SearchBar from "./SearchBar";
import Notifications from "./Notifications";
import NavMediaDrop from "./NavMediaDrop";
import NavMediaItem from "./NavMediaItem";


export default function Header() {
    const { currentUser, logout } = useUser();
    const username = currentUser?.username;
    const image = <Image src={currentUser?.profile_image} className="navbar-picture"/>

    // Login page and public pages
    if (currentUser === null) {
        return (
            <Navbar expand="lg" variant="dark" bg="dark" fixed="top" className="navbar-bottom">
                <Container className="navbar-container">
                    <Navbar.Brand className="text-light">MyLists</Navbar.Brand>
                </Container>
            </Navbar>
        )
    }

    return (
        <Navbar expand="lg" variant="dark" bg="dark" fixed="top" className="navbar-bottom">
            <Container className="navbar-container">
                {currentUser === undefined ?
                    <Loading/>
                    :
                    <>
                        <NavMediaDrop
                            currentUser={currentUser}
                        />
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="nav-collapsed">
                                <SearchBar/>
                            </Nav >
                            <Nav className="m-r-auto">
                                <Nav.Link className="nav-collapsed" as={NavLink} to={"/hall_of_fame"}>HoF</Nav.Link>
                                <Nav.Link className="nav-collapsed" as={NavLink} to={"/stats"}>Stats</Nav.Link>
                                <Nav.Link className="nav-collapsed" as={NavLink} to={"/current_trends"}>Trends</Nav.Link>
                            </Nav>
                            <Nav className="m-r-10">
                                <Nav.Link className="nav-collapsed" as={NavLink} to={"/coming_next"}>Coming Next</Nav.Link>
                                <Nav.Link className="nav-collapsed"><Notifications/></Nav.Link>
                            </Nav>
                            <Nav className="nav-collapsed">
                                <NavDropdown title={image} data-bs-theme="dark">
                                    <NavMediaItem
                                        to={`/profile/${username}`}
                                        icon={<FaUser className="text-grey"/>}
                                        text="Profile"
                                    />
                                    <NavMediaItem
                                        to="/settings"
                                        icon={<FaCog className="text-grey"/>}
                                        text="Settings"
                                    />
                                    <NavDropdown.Item onClick={logout} className="navbar-drop">
                                        <Row>
                                            <Col className="col-3"><FaSignOutAlt className="text-grey"/></Col>
                                            <Col className="col-9">Logout</Col>
                                        </Row>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                }
            </Container>
        </Navbar>
    );
}