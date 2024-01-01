import React, {useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import HLine from "../components/primitives/HLine";
import {useApi} from "../providers/ApiProvider";
import {useFlash} from "../providers/FlashProvider";
import {useUser} from "../providers/UserProvider";
import ErrorPage from "./ErrorPage";


const AdminPage = () => {
    const api = useApi();
    const flash = useFlash();
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm();

    if (currentUser.role === "user") {
        return <ErrorPage/>
    }

    async function onSubmit(data) {
        const response = await api.adminLogin(data.password);

        if (!response.ok) {
            return flash(response.body.description, "danger");
        }

        flash("Admin elevation granted.", "success");
        return navigate("/admin/dashboard");
    }

    return (
        <>
            <h3 className="m-t-40">Admin Elevation</h3>
            <HLine/>
            <Form onSubmit={handleSubmit(onSubmit)} className="m-t-20">
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register("password", {required: "Password is required"})}
                    />
                    {errors.password && <span className="text-danger">{errors.password?.message}</span>}
                </Form.Group>
                <Form.Group className="mb-2 d-flex justify-content-center">
                    <Button type="submit" variant="primary">Submit</Button>
                </Form.Group>
            </Form>
        </>
    );
};


export default withPrivateRoute(AdminPage);
