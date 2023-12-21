import React from "react";
import {FaLongArrowAltRight} from "react-icons/fa";


export default function Payload({ payload }) {
    return (
        <>
            {payload.length === 2 ?
                <>{payload[0]} <FaLongArrowAltRight size="16" /> {payload[1]}</>
                :
                payload[0]
            }
        </>
    )
}