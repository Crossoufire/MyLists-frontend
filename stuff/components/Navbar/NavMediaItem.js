import React from "react";
import Link from "next/link";
import {Col, NavDropdown, Row} from "react-bootstrap";


export default function NavMediaItem({ href, icon, text, handleExpansion }){
    return (
        <NavDropdown.Item as={Link} href={href} onClick={handleExpansion}>
            <Row>
                <Col className="col-3">{icon}</Col>
                <Col className="col-9">{text}</Col>
            </Row>
        </NavDropdown.Item>
    )
}
