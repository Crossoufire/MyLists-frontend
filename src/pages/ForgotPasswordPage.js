import React from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

import {withPublicRoute} from "../components/HigherOrderComp/hocs";
import {useApi} from "../providers/ApiProvider";
import {useFlash} from "../providers/FlashProvider";
import HLine from "../components/primitives/HLine";


const ForgotPasswordPage = () => {
    const api = useApi();
    const flash = useFlash();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    async function onSubmit() {
        // noinspection JSCheckFunctionSignatures
        const response = await api.post("/tokens/reset_password_token", {
            email: getValues("email"),
            callback: process.env.REACT_APP_RESET_PASSWORD_CALLBACK,
        });

        if (response.status !== 200) {
            return flash(response.body.message, "danger");
        }

        return flash(response.body.message, "success");
    }


    // noinspection JSValidateTypes
    return (
        <div className="m-t-30 m-b-50">
            <h4>Forgot password</h4>
            <HLine/>
            <div className="m-t-20" style={{maxWidth: "350px"}}>
                <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
                    <Form.Group className="mb-4">
                        <Form.Control
                            placeholder="E-mail"
                            type="email"
                            {...register("email", {required: "Email is required"})}
                        />
                        {errors.email && <span className="text-danger">{errors.email?.message}</span>}
                    </Form.Group>
                    <Button className="mb-2" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    );
};


export default withPublicRoute(ForgotPasswordPage);