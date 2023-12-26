import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {useApi} from "../providers/ApiProvider";
import {useFlash} from "../providers/FlashProvider";
import {withPublicRoute} from "../components/HigherOrderComp/hocs";


const RegisterTokenPage = () => {
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
};
export default withPublicRoute(RegisterTokenPage);

