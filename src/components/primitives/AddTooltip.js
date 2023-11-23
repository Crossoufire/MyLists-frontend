import {OverlayTrigger, Tooltip} from "react-bootstrap";


export default function AddTooltip ({ title, children, place="top", cn= "", addSpan=false }) {
    // noinspection JSValidateTypes,RequiredAttributes
    return (
        <OverlayTrigger placement={place} overlay={<Tooltip>{title}</Tooltip>}>
            {addSpan ? <span className={cn}>{children}</span> : children}
        </OverlayTrigger>
    );
}
