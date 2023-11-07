import React from "react";
import {Dropdown} from "react-bootstrap";


export default function FilterSortDrop({ name, activeData, allData, updateFunction }) {
    const handleClick = (ev) => updateFunction(ev.target.text);

    return (
        <div className="d-flex gap-3">
            <Dropdown drop="down-centered">
                <Dropdown.Toggle as={"div"} className="cu-p fw-5">
                    {name}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark" style={{overflowY: "auto", maxHeight: "385px"}}>
                    {allData.map(data => (
                        <Dropdown.Item key={data} onClick={handleClick} className={activeData === data && "active"}>
                            {data}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <div className="hide-active-mobile">{activeData}</div>
        </div>
    )
}