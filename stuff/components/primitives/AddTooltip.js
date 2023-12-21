import React, {forwardRef} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


const AddTooltip = forwardRef(({ title, children, place = "top", cn = "", addSpan = false}, ref) => {
    // noinspection JSValidateTypes, RequiredAttributes
    return (
        <OverlayTrigger placement={place} overlay={<Tooltip>{title}</Tooltip>}>
            {addSpan ? <span ref={ref} className={cn}>{children}</span> : children}
        </OverlayTrigger>
    );
});


export default AddTooltip;