import {useContext} from "react";
import {Collapse, Container, Alert} from "react-bootstrap";
import {FlashContext} from "../../contexts/FlashProvider";


function FlashMessage() {
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
}


export default function Content({ children }) {
    return (
        <Container className="main">
            <FlashMessage/>
            {children}
        </Container>
    );
}
