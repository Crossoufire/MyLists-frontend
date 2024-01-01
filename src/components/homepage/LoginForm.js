import React from "react";
import {Button, Form} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {useFlash} from "../../providers/FlashProvider";
import {useUser} from "../../providers/UserProvider";


export default function LoginForm() {
	const flash = useFlash();
	const { login } = useUser();
	const navigate = useNavigate();
	const location = useLocation();
	const { register, handleSubmit, formState: { errors } } = useForm();

	async function onSubmit(data) {
		const isLogged = await login(data.username, data.password);

		if (isLogged.status === 401) {
			return flash("Username or password wrong. Please check your credentials.", "warning");
		}
		else if (!isLogged.ok) {
			return flash(isLogged.body.message, "warning");
		}

		navigate((location.state && location.state.next) ? location.state.next : `/profile/${data.username}`);
	}


	// noinspection JSValidateTypes
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="mb-4">
				<Form.Control
					placeholder="Username"
					{...register("username", {required: "Username is required"})}
				/>
				{errors.username && <span className="text-danger">{errors.username?.message}</span>}
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Control
					type="password"
					placeholder="Password"
					{...register("password", {required: "Password is required"})}
				/>
				{errors.password && <span className="text-danger">{errors.password?.message}</span>}
			</Form.Group>
			<Form.Group className="mb-4">
				<Link to="/forgot_password">
					<div>Forgot password?</div>
				</Link>
			</Form.Group>
			<Form.Group className="mb-2 d-flex justify-content-center">
				<Button type="submit" variant="dark">Login</Button>
			</Form.Group>
		</Form>
	);
};
