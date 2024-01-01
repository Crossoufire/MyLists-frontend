import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Tab, Tabs} from "react-bootstrap";

import {useApi} from "../providers/ApiProvider";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";


const ChangelogPage = () => {
    const api = useApi();
    const [serverChangelog, setServerChangelog] = useState("");
    const [frontendChangelog, setFrontendChangelog] = useState("");

    useEffect(() => {
        const fetchFrontendChangelog = async () => {
            try {
                const response = await fetch("/CHANGELOG.md");

                if (!response.ok) {
                    return setFrontendChangelog(`Failed to fetch the frontend changelog: error ${response.status}`);
                }

                const content = await response.text();
                setFrontendChangelog(content);
            } catch (error) {
                return setFrontendChangelog(`Error fetching the frontend changelog: ${error.message}`);
            }
        };

        const fetchBackendChangelog = async () => {
            const response = await api.get("/changelog");

            if (!response.ok) {
                return setServerChangelog(response.body.description);
            }

            setServerChangelog(response.body.data);
        };

        void fetchFrontendChangelog();
        void fetchBackendChangelog();

    }, [api]);

    return (
        <div className="m-t-40">
            <Tabs justify className="bg-card justify-content-center gap-3 m-t-30" data-bs-theme="dark">
                <Tab eventKey="frontend" title="Frontend">
                    <ReactMarkdown className="m-t-30">{frontendChangelog}</ReactMarkdown>
                </Tab>
                 <Tab eventKey="backend" title="Backend">
                    <ReactMarkdown className="m-t-30">{serverChangelog}</ReactMarkdown>
                </Tab>
            </Tabs>
        </div>
    );
};


export default withPrivateRoute(ChangelogPage);
