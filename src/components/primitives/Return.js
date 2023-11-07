import React from "react";
import {FaCaretLeft} from "react-icons/fa";


export default function Return({ value }) {
    return (
        <span style={{fontWeight: 600}}>
            <FaCaretLeft className="m-b-2"/>
            &nbsp; Return {value}
        </span>
    )
}
