import {useLocation, Navigate} from "react-router-dom";
import {useUser} from "../../contexts/UserProvider";
import {useFlash} from "../../contexts/FlashProvider";


export default function PrivateRoute({ children }) {
	const flash = useFlash();
	const location = useLocation();
	const { currentUser } = useUser();


	if (currentUser === undefined) {
		return null;
	}
	else if (currentUser) {
		return children;
	}
	else {
		flash("You need to log in before accessing this page.", "info");
		const url = location.pathname + location.search + location.hash;

		return <Navigate to="/" state={{next: url}}/>
	}
}
