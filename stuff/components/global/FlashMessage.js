"use client";
import {useContext} from "react";
import {Alert, Collapse} from "react-bootstrap";
import {FlashContext} from "@/stuff/providers/FlashProvider";


const FlashMessage = () => {
    const { flashMessage, visible, hideFlash } = useContext(FlashContext);

    return (
        <Collapse in={visible}>
            <div className="flash-message">
                <Alert variant={flashMessage.type || "info"} onClose={hideFlash} data-visible={visible} show dismissible>
                    {flashMessage.message}
                </Alert>
            </div>
        </Collapse>
    );
};


export default FlashMessage;