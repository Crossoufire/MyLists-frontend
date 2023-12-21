import React from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

import {useApi} from "@/stuff/providers/ApiProvider";
import {useFlash} from "@/stuff/providers/FlashProvider";


const RegisterForm = () => {
	const api = useApi()
	const flash = useFlash();
	const {register, handleSubmit, getValues, watch, formState: { errors }} = useForm();

	const onSubmit = async () => {
		// noinspection JSCheckFunctionSignatures
		const response = await api.post("/register_user", {
			username: getValues("username"),
			email: getValues("email"),
			password: getValues("password"),
			callback: process.env.NEXT_PUBLIC_REGISTER_CALLBACK,
		});

		if (response.status !== 200) {
			return flash(response.body.message, "danger");
		}

		flash(response.body.message, "success");
	};

	// noinspection JSValidateTypes
	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="text-center">
			<Form.Group className="mb-4">
				<Form.Control
					placeholder="Username"
					{...register("username", {
						required: "Username is required",
						minLength: {value: 3, message: "The username is too short (3 min)"},
						maxLength: {value: 14, message: "The username is too long (14 max)"}
					})}
				/>
				{errors.username && <span className="text-danger">{errors.username?.message}</span>}
			</Form.Group>
			<Form.Group className="mb-4">
				<Form.Control
					placeholder="E-mail"
					type="email"
					{...register("email", {
						required: "Email is required",
					})}
				/>
				{errors.email && <span className="text-danger">{errors.email?.message}</span>}
			</Form.Group>
			<Form.Group className="mb-4">
				<Form.Control
					type="password"
					placeholder="Password"
					{...register("password", {
						required: "Password is required",
						minLength: {value: 8, message: "The password must have at least 8 characters"}
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
			<Button className="mb-2" type="submit">Register</Button>
		</Form>
	);
};


export default RegisterForm;
