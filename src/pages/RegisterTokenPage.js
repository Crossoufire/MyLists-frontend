import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {useApi} from "../contexts/ApiProvider";
import {useFlash} from "../contexts/FlashProvider";


export default function RegisterTokenPage() {
    const api = useApi();
    const flash = useFlash();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        (async () => {
            const response = await api.post("/tokens/register_token", {
                token: token,
            });

            flash(response.body.message);
            navigate("/");
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
