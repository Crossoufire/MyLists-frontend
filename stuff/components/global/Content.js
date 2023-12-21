import {Container} from "react-bootstrap";

export default function Content({ children }) {
    return (
        <Container className="main">
            {children}
        </Container>
    );
}
