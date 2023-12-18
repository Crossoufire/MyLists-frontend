import React from "react";
import {Tabs, Tab} from "react-bootstrap";


const NavigationStatus = ({ allStatus, activeStatus, updateStatus }) => {
    const handleStatus = (val) => {
        if (activeStatus === val) {
            return;
        }
        updateStatus(val);
    }

    return (
        <div id="medialist-tabs">
            <Tabs className="bg-card justify-content-center gap-3 m-t-30" activeKey={activeStatus}
                  onSelect={handleStatus} data-bs-theme="dark">
                {allStatus.map(status =>
                    <Tab key={status} eventKey={status} title={status.toUpperCase()}/>
                )}
            </Tabs>
        </div>
    )
};


export default NavigationStatus
