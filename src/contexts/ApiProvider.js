import React, {createContext, useContext} from "react";
import MyListsApiClient from "../api/MyListsApiClient";


export const ApiContext = createContext(undefined);


export default function ApiProvider({ children }) {
	const api = new MyListsApiClient();

	return (
		<ApiContext.Provider value={api}>
			{children}
		</ApiContext.Provider>
	);
}


export function useApi() {
	return useContext(ApiContext);
}
