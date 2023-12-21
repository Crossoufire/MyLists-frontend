"use client";
import React, {useRef, useState} from "react";
import {FaCog, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Col, Container, Image, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Link from "next/link";

import {useUser} from "@/stuff/providers/UserProvider";
import {useOnClickOutside} from "@/stuff/hooks/ClickedOutsideHook";
import Loading from "../primitives/Loading";
import SearchBar from "./SearchBar";
import Notifications from "./Notifications";
import NavMediaDrop from "./NavMediaDrop";
import NavMediaItem from "./NavMediaItem";


export default function Header() {
    const ref = useRef();
    const hamRef = useRef();
    const { currentUser, logout } = useUser();
    const [expanded, setExpanded] = useState(false);
    useOnClickOutside(ref, () => handleExpansion(), hamRef)

    const username = currentUser?.username;
    const image = <Image src={currentUser?.profile_image} className="navbar-picture"/>

    const handleExpansion = () => {
        if (window.matchMedia("(max-width: 490px)")) {
            setExpanded(false);
        }
    };

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
        <Navbar expanded={expanded} expand="lg" variant="dark" bg="dark" fixed="top" className="navbar-bottom">
            <Container className="navbar-container">
                {currentUser === undefined ?
                    <Loading style={null}/>
                    :
                    <>
                        <NavMediaDrop
                            currentUser={currentUser}
                        />
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} ref={hamRef}/>
                        <Navbar.Collapse aria-controls="responsive-navbar-nav" ref={ref}>
                            <Nav className="nav-mobile">
                                <SearchBar handleExpansion={handleExpansion}/>
                            </Nav >
                            <Nav className="m-r-auto">
                                <Nav.Link className="nav-mobile" as={Link} href={"/hall_of_fame"} onClick={handleExpansion}>HoF</Nav.Link>
                                <Nav.Link className="nav-mobile" as={Link} href={"/stats"} onClick={handleExpansion}>Stats</Nav.Link>
                                <Nav.Link className="nav-mobile" as={Link} href={"/current_trends"} onClick={handleExpansion}>Trends</Nav.Link>
                            </Nav>
                            <Nav className="m-r-10">
                                <Nav.Link className="nav-mobile" as={Link} href={"/coming_next"} onClick={handleExpansion}>Coming Next</Nav.Link>
                                <Nav.Link className="nav-mobile"><Notifications/></Nav.Link>
                            </Nav>
                            <Nav className="nav-mobile">
                                <NavDropdown title={image} data-bs-theme="dark" align={{lg: "end"}}>
                                    <NavMediaItem
                                        href={`/profile/${username}`}
                                        icon={<FaUser className="text-grey"/>}
                                        text="Profile"
                                        handleExpansion={handleExpansion}
                                    />
                                    <NavMediaItem
                                        href="/settings"
                                        icon={<FaCog className="text-grey"/>}
                                        text="Settings"
                                        handleExpansion={handleExpansion}
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