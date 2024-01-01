import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";


const ChangelogPage = () => {
    const [changelogContent, setChangelogContent] = useState("");

    useEffect(() => {
        const fetchChangelog = async () => {
            const response = await fetch("/CHANGELOG.md");
            const content = await response.text();
            setChangelogContent(content);
        };

        void fetchChangelog();
    }, []);

    return (
        <div className="m-t-40">
            <ReactMarkdown>{changelogContent}</ReactMarkdown>
        </div>
    );
};


export default withPrivateRoute(ChangelogPage);
