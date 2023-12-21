import {useEffect, useState} from "react";
import useSWR from "swr";

import {useApi} from "../contexts/ApiProvider";


export function useFetchData2(url, query, options) {
    const api = useApi();
    const [error, setError] = useState();
    const [apiData, setApiData] = useState();
    const [loading, setLoading] = useState(true);

    const fetchAPI = async () => {
        setLoading(true);
        setError(undefined);

        const response = await api.get(url, query, options);

        if (!response.ok) {
            setLoading(false);

            const error = new Error("An error occurred while fetching the data.");
            error.message = response.body.message;
            error.status = response.status;
            error.description = response.body.description;

            // noinspection JSCheckFunctionSignatures
            setError(error);
        } else {
            setLoading(false);
            setApiData(response.body.data);
        }
    };

    useEffect(() => {
        fetchAPI();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, url, JSON.stringify(query)]);

    return { apiData, loading, error };
}


export function useFetchData(url, query, options, addDelay) {
    const api = useApi();

    const fetcher = async (url, query, options,addDelay = 0) => {
        await new Promise(resolve => setTimeout(resolve, addDelay));

        const response = await api.get(url, query, options);

        if (!response.ok) {
            const error = new Error("An error occurred while fetching the data.");

            error.message = response.body.message;
            error.status = response.status;
            error.description = response.body.description;

            throw error;
        }

        return response.body.data;
    }

    const { data, isLoading, error, mutate } = useSWR([url, query, options, addDelay], () => fetcher(url, query, options, addDelay));

    return { apiData: data, loading: isLoading, error, mutate };
}