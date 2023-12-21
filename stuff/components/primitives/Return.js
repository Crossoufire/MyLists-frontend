import {FaCaretLeft} from "react-icons/fa";


const Return = ({ value }) => {
    return (
        <span className="fw-55">
            <FaCaretLeft className="m-b-2"/>
            &nbsp; Return {value}
        </span>
    );
}


export default Return;
