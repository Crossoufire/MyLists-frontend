import {useEffect, useState} from "react";
import {useApi} from "../contexts/ApiProvider";


export function useFetchData(url, query, options) {
    const api = useApi();
    const [apiData, setApiData] = useState();
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchAPI = async () => {
        setLoading(true);
        setError({});

        const response = await api.get(url, query, options);

        if (!response.ok) {
            setLoading(false);
            setError({
                status: response.status,
                message: response.body.message,
                description: response.body.description,
            });
            return;
        }

        setLoading(false);
        setApiData(response.body.data);
    };

    useEffect(() => {
        fetchAPI();
    }, [api, url, JSON.stringify(query)]);

    return { apiData, setApiData, loading, setLoading, error, setError, refetchData: fetchAPI };
}
