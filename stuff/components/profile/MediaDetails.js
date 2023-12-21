"use client";
import React from "react";
import {Card, Tab, Tabs} from "react-bootstrap";

import {capitalize} from "@/stuff/utils/functions";
import MediaStats from "./MediaStats";


const MediaDetails = ({ mediaData, userData }) => (
    <Card className="bg-card text-light">
        <Card.Body>
            <Tabs fill defaultActiveKey="series" data-bs-theme="dark">
                {mediaData.map(mt =>
                    <Tab key={mt.media_type} eventKey={mt.media_type} title={capitalize(mt.media_type)}>
                        <MediaStats
                            user={userData}
                            media={mt}
                        />
                    </Tab>
                )}
            </Tabs>
        </Card.Body>
    </Card>
);


export default MediaDetails