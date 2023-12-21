import {Image} from "react-bootstrap";

const ErrorPage = (props) => {
    let { message, status, description } = props;

    if (status === undefined) {
        message = "Page not found";
        status = 404;
        description = "Sorry the requested page was not found";
    }

    return (
        <div className="d-flex flex-column text-center m-t-35">
            <h2>{message} ({status})</h2>
            <div className="fs-20 m-t-10">{description}</div>
            <div className="justify-content-center m-t-50">
                <Image
                    className="m-t-20"
                    src={require("../images/error.jpg")}
                    height={300}
                    width={300}
                    alt="error"
                />
            </div>
        </div>
    );
};


export default ErrorPage;