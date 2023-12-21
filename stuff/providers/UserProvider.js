import {createContext, useContext, useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useApi} from "./ApiProvider";
import {useFlash} from "@/stuff/providers/FlashProvider";


const UserContext = createContext();


export default function UserProvider({ children }) {
	const api = useApi();
	const flash = useFlash();
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState(null);

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
		flash("You are now logged-out", "info")
		router.push("/");
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
