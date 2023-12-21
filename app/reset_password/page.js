"use client";
import React from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {useRouter, useSearchParams} from "next/navigation";

import {useApi} from "@/stuff/providers/ApiProvider";
import {useFlash} from "@/stuff/providers/FlashProvider";
import HLine from "@/stuff/components/primitives/HLine";


const ResetPasswordPage = () => {
    const api = useApi();
    const flash = useFlash();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm();

    async function onSubmit() {
        // noinspection JSCheckFunctionSignatures
        const response = await api.post("/tokens/reset_password", {
            token: token,
            new_password: getValues("password"),
        });

        if (response.status !== 200) {
            return flash(response.body.message, "danger");
        }

        flash(response.body.message, "success");
        router.push("/");
    }

    // noinspection JSValidateTypes
    return (
        <div className="m-t-30 m-b-50">
            <h4>Change your password</h4>
            <HLine/>
            <div className="m-l-r-auto" style={{maxWidth: "500px"}}>
                <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "You must specify a password",
                                minLength: {value: 8, message: "Password must have at least 8 characters"}
                            })}
                        />
                        {errors.password && <span className="text-danger">{errors.password?.message}</span>}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            {...register("password_repeat", {
                                validate: (val) => {
                                    // noinspection JSCheckFunctionSignatures
                                    if (watch("password") !== val) {
                                        return "The passwords do not match";
                                    }
                                }
                            })}
                        />
                        {errors.password_repeat && <span className="text-danger">{errors.password_repeat?.message}</span>}
                    </Form.Group>
                    <Button className="mb-2" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    );
};


export default ResetPasswordPage
