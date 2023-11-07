import {Image} from "react-bootstrap";


export default function ErrorPage({status=404, message="Not Found", description="This page was not found"}) {
    return (
        <div className="d-flex flex-column m-t-30">
            <h1>{message} ({status})</h1>
            <p className="m-t-20">{description}</p>
            <Image
                className="m-t-40"
                src={require("../images/error.jpg")}
                height={300}
                width={300}
                alt="error"
            />
        </div>
    );
}
