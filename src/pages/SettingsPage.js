import React from "react";
import {Form, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {FaQuestionCircle} from "react-icons/fa";

import {maxWidthSettings} from "../utils/constants";
import AddTooltip from "../components/primitives/AddTooltip";
import {useApi} from "../providers/ApiProvider";
import {useUser} from "../providers/UserProvider";
import {useFlash} from "../providers/FlashProvider";
import HLine from "../components/primitives/HLine";
import useCollapse from "../hooks/CollapseHook";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";


const SettingsForm = () => {
    const api = useApi();
    const flash = useFlash();
    const {currentUser, setCurrentUser, logout} = useUser();
    const {isOpen, caret, toggleCollapse} = useCollapse(false);
    const {register, handleSubmit, watch, formState: { errors }} = useForm();

    const apiCall = async (formData) => {
        let response;

        try {
            let body = {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
                body: formData,
            }

            response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/update_settings`, body);
        }
        catch (error) {
            response = {
                ok: false,
                status: 500,
                json: async () => {
                    return {
                        code: 500,
                        message: "Internal Server Error",
                        description: error.toString(),
                    };
                }
            };
        }

        return {
            ok: response.ok,
            status: response.status,
            body: response.status !== 204 ? await response.json() : null,
        }
    }
    async function onSubmit(data) {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (key === "profileImage" || key === "backImage") {
                formData.append(key, data[key][0]);
                return;
            }

            formData.append(key, data[key]);
        });

        const response = await apiCall(formData);

        if (!response.ok) {
            return flash(response.body.message, "danger");
        }

        setCurrentUser(response.body.updated_user);
        flash(response.body.message, "success");
    }
    const handleDeleteAccount = async () => {
        let secondConfirm;

        const firstConfirm = window.confirm("Are you *REALLY SURE* you want to delete your account? " +
            "No data will be recoverable. This *CANNOT* be undone.");

        if (firstConfirm) {
            secondConfirm = window.confirm("Are you *REALLY* sure?");
        }

        if (secondConfirm) {
            const response = await api.post("/delete_account");

            if (!response.ok) {
                return flash(response.body.description, "danger");
            }

            flash(response.body.message, "info");
            logout();
        }
    };

    // noinspection JSValidateTypes
    return (
        <>
            <h3 className="m-t-30">Settings</h3>
            <HLine/>
            <div className="m-t-20 m-b-40">
                <Form onSubmit={handleSubmit(onSubmit)} data-bs-theme="dark" style={{maxWidth: maxWidthSettings}}>
                    <h5>General</h5>
                    <HLine/>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={currentUser.username}
                            {...register("username", {
                                minLength: {value: 3, message: "The username is too short (3 min)"},
                                maxLength: {value: 14, message: "The username is too long (14 max)"}
                            })}
                        />
                        {errors.username && <span className="text-danger">{errors.username?.message}</span>}
                    </Form.Group>
                    <Form.Group controlId="formProfile" className="mb-2">
                        <Form.Label>Profile image</Form.Label>
                        <Form.Control
                            type="file"
                            {...register("profileImage")}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBackground" className="m-b-40">
                        <Form.Label>Background Image</Form.Label>
                        <Form.Control
                            type="file"
                            {...register("backImage")}
                        />
                    </Form.Group>

                    <h5>Activate other List - Change rating</h5>
                    <HLine/>
                    <Form.Group controlId="formCheckAnime">
                        <Form.Check
                            type="checkbox"
                            label="Activate your anime list"
                            defaultChecked={currentUser.add_anime}
                            {...register("checkAnime")}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCheckGames">
                        <Form.Check
                            type="checkbox"
                            label="Activate your games list"
                            defaultChecked={currentUser.add_games}
                            {...register("checkGames")}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCheckBooks" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Activate your books list"
                            defaultChecked={currentUser.add_books}
                            {...register("checkBooks")}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCheckMetric" className="m-b-40">
                        <Form.Label className="text-light">
                            Score/Feeling &nbsp;
                            <AddTooltip title={"Switch between a numerical rating on a scale of 0 to 10 " +
                                "(steps of 0.5) to an emoticon-based rating to convey your liking or " +
                                "disliking of a media."} addSpan>
                                <FaQuestionCircle/>
                            </AddTooltip>
                        </Form.Label>
                        <Form.Check
                            type="checkbox"
                            label="Switch score (unchecked) to feeling (checked)"
                            defaultChecked={currentUser.add_feeling}
                            {...register("checkMetric")}
                        />
                    </Form.Group>

                    <h5>Modify your password</h5>
                    <HLine/>
                    <Form.Group controlId="formCurrentPassword" className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Current password"
                            {...register("currentPassword")}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewPassword" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            {...register("newPassword", {
                                minLength: {value: 8, message: "The password must have at least 8 characters"}
                            })}
                        />
                        {errors.newPassword && <span className="text-danger">{errors.newPassword?.message}</span>}
                    </Form.Group>
                    <Form.Group controlId="formConfirmNewPassword" className="m-b-40">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            {...register("confirmNewPassword", {
                                validate: (val) => {
                                    // noinspection JSCheckFunctionSignatures
                                    if (watch("newPassword") !== val) {
                                        return "The passwords do not match";
                                    }
                                }
                            })}
                        />
                        {errors.confirmNewPassword &&
                            <span className="text-danger">{errors.confirmNewPassword?.message}</span>
                        }
                    </Form.Group>

                    <div className="m-t-40 text-center">
                        <Button variant="primary" type="submit">Update settings</Button>
                    </div>
                </Form>
                <div className="m-t-40" style={{maxWidth: maxWidthSettings}}>
                    <h5 className="cu-p text-danger" onClick={toggleCollapse}>{caret} &nbsp;Danger Zone</h5>
                    <HLine/>
                    {isOpen &&
                        <div className="text-center">
                            <Button variant="danger" onClick={handleDeleteAccount}>
                                DELETE MY ACCOUNT (DEFINITIVE!)
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};


export default withPrivateRoute(SettingsForm);
