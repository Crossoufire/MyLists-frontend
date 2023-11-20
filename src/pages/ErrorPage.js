import {Image} from "react-bootstrap";

export default function ErrorPage({ error }) {
    return (
        <div className="d-flex flex-column text-center m-t-35">
            <h2>{error.message} ({error.status})</h2>
            <div className="fs-20 m-t-10">{error.description}</div>
            <div className="justify-content-center m-t-50">
                <Image
                    className="m-t-20"
                    src={require("../images/error.jpg")}
                    height={300}
                    width={300}
                    alt={"error"}
                />
            </div>
        </div>
    );
}
