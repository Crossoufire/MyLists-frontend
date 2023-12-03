import React from "react";
import {NavLink} from "react-router-dom";
import {Col, NavDropdown, Row} from "react-bootstrap";


export default function NavMediaItem({ to, icon, text, handleExpansion }){
    return (
        <NavDropdown.Item as={NavLink} to={to} onClick={handleExpansion}>
            <Row>
                <Col className="col-3">{icon}</Col>
                <Col className="col-9">{text}</Col>
            </Row>
        </NavDropdown.Item>
    )
}
