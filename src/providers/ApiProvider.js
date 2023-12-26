import React, {createContext, useContext} from "react";
import MyApiClient from "../api/MyApiClient";


export const ApiContext = createContext(undefined);


export default function ApiProvider({ children }) {
	const api = new MyApiClient();

	return (
		<ApiContext.Provider value={api}>
			{children}
		</ApiContext.Provider>
	);
}


export function useApi() {
	return useContext(ApiContext);
}
