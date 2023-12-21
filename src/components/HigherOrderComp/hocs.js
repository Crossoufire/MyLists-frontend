import {useLocation, useNavigate} from "react-router-dom";
import {useFlash} from "../../contexts/FlashProvider";
import {useUser} from "../../contexts/UserProvider";


export const withPrivateRoute = (Component) => {
    return (props) => {
        const flash = useFlash();
        const navigate = useNavigate();
        const { currentUser } = useUser();

        if (currentUser === undefined) {
            return null;
        } else if (currentUser) {
            return <Component {...props}/>;
        } else {
            flash("You need to log in before accessing this page.", "info");
            navigate("/");
            return null;
        }
    };
};

export const withPublicRoute = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const { currentUser } = useUser();

        if (currentUser === undefined) {
            return null;
        } else if (currentUser && location.pathname === "/") {
            return navigate(`/profile/${currentUser.username}`);
        } else {
            return <Component {...props}/>;
        }
    };
};
