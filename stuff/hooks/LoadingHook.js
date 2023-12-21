import {useState} from "react";

export default function useLoading() {
    const [isLoading, setLoading] = useState(false);

    const handleLoading = async (asyncFunction, ...args) => {
        let loadingTimer = setTimeout(() => {
            setLoading(true);
        }, 200);

        const response = await asyncFunction(...args);

        clearTimeout(loadingTimer);
        setLoading(false);

        return response;
    };

    return [isLoading, handleLoading];
}
