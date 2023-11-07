import {createContext, useContext, useState, useEffect} from "react";
import {useApi} from "./ApiProvider";
import {useNavigate} from "react-router-dom";


const UserContext = createContext(undefined);


export default function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const api = useApi();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			if (api.isAuthenticated()) {
				const response = await api.get("/current_user");
				setCurrentUser(response.ok ? response.body : null);
			}
			else {
				setCurrentUser(null);
			}
		})();
	}, [api]);

	const login = async (username, password) => {
		const logging = await api.login(username, password);

		if (logging.ok) {
			const response = await api.get("/current_user");
			setCurrentUser(response.ok ? response.body : null);
		}

		return logging;
	};

	const logout = async () => {
		await api.logout();
		setCurrentUser(null);
		navigate("/");
	};

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
