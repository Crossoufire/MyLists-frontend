import { useEffect, useState } from "react";


export function useDebounce(value, timeout, callback, ...args) {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        clearTimer();

        if (value && callback) {
            const newTimer = setTimeout(() => {
                callback(...args);
            }, timeout);
            setTimer(newTimer);
        }
    }, [value]);

    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer);
        }
    };
}
