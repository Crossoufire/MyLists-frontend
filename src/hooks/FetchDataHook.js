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
    }, [api, url, JSON.stringify(query)]);

    return { apiData, loading, error };
}


export function useFetchData(url, query, options) {
    const api = useApi();

    const fetcher = async (url, query, options) => {
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

    const { data, isLoading, error, mutate } = useSWR([url, query, options], () => fetcher(url, query, options));

    return { apiData: data, loading: isLoading, error, mutate };
}