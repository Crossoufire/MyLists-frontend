import React from "react";
import {Tabs, Tab} from "react-bootstrap";


export default function NavigationStatus({ allStatus, activeStatus, updateStatus }) {
    const handleStatus = (val) => {
        if (activeStatus === val) {
            return;
        }

        updateStatus(val);
    }

    return (
        <div id="medialist-tabs">
            <Tabs className="bg-card m-t-30 justify-content-center gap-3" activeKey={activeStatus}
                  onSelect={handleStatus} data-bs-theme="dark">
                {allStatus.map(status =>
                    <Tab key={status} eventKey={status} title={status.toUpperCase()}/>
                )}
            </Tabs>
        </div>
    )
}
