import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import Link from "next/link";

import {useUser} from "@/stuff/providers/UserProvider";
import {useFlash} from "@/stuff/providers/FlashProvider";


const LoginForm = () => {
	const flash = useFlash();
	const { login } = useUser();
	const { push } = useRouter();
	const { register, handleSubmit, formState: { errors } } = useForm();

	async function onSubmit(data) {
		const resp = await login(data.username, data.password);

		if (resp.status === 401) {
			return flash("Username or password wrong. Please check your credentials.", "warning");
		}
		else if (!resp.ok) {
			return flash(resp.body.message, "warning");
		}

		push(`/profile/${data.username}`);
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
				<Link href="/forgot_password">
					<div>Forgot password?</div>
				</Link>
			</Form.Group>
			<Form.Group className="mb-2 d-flex justify-content-center">
				<Button type="submit" variant="dark">Login</Button>
			</Form.Group>
		</Form>
	);
};


export default LoginForm;
