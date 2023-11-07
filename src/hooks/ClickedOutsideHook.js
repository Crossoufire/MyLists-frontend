import {useEffect} from "react";


export function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (ev) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(ev.target)) {
                    return;
                }
                handler(ev);
            };

            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}
