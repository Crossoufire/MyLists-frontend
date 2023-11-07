import {useUser} from "../../contexts/UserProvider";
import {Navigate, useLocation} from "react-router-dom";


export default function PublicRoute({ children }) {
	const { currentUser } = useUser();
	const location = useLocation();

	if (currentUser === undefined) {
		return null;
	}
	else if (currentUser && location.pathname === "/") {
		return <Navigate to={"/profile/" + currentUser.username} />
	}
	else {
		return children;
	}
}
