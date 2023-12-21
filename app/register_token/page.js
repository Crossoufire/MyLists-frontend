"use client";
import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";

import {useApi} from "@/stuff/providers/ApiProvider";
import {useFlash} from "@/stuff/providers/FlashProvider";


const RegisterTokenPage = () => {
    const api = useApi();
    const flash = useFlash();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        (async () => {
            const response = await api.post("/tokens/register_token", {
                token: token,
            });

            flash(response.body.message);
            router.push("/");
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
export default RegisterTokenPage
