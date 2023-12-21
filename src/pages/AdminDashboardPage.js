import {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Row, Col, Form} from "react-bootstrap";

import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import HLine from "../components/primitives/HLine";
import Loading from "../components/primitives/Loading";
import {useFetchData} from "../hooks/FetchDataHook";
import ErrorPage from "./ErrorPage";
import {useFlash} from "../contexts/FlashProvider";
import useAdminApi from "../hooks/AdminUpdateAPI";


function PopulateUsers({ users }) {
    const allRoles = ["user", "manager"];
    const { role, deletion } = useAdminApi();

    const updateRole = async (ev, userId) => {
        ev.preventDefault();
        await role(userId, ev.target.value);
    }

    const deleteAccount = async (userId, username) => {
        const firstConfirm = window.confirm(`Are you *SURE* you want to delete the account of ${username}?`);

        if (firstConfirm) {
            const secondConfirm = window.confirm("This action is irreversible. Are you *REALLY, REALLY* sure?");

            if (secondConfirm) {
                await deletion(userId);
            }
        }
    }


    return (
        <div className="m-t-25">
            <Row className="fw-5 gy-3 gx-3">
                {users.map(user =>
                    <Fragment key={user.id}>
                        <Col xs={5}>{user.username}</Col>
                        <Col xs={4}>
                            <Form.Select className="bg-card text-light" onChange={(ev) => updateRole(ev, user.id)}
                                         defaultValue={user.role}>
                                {allRoles.map(s => <option key={s}>{s}</option>)}
                            </Form.Select>
                        </Col>
                        <Col xs={3}>
                            <Button variant="danger" onClick={() => deleteAccount(user.id, user.username)}>
                                Delete
                            </Button>
                        </Col>
                    </Fragment>
                )}
            </Row>
        </div>
    );
}


const AdminDashBoardPage = () => {
    const flash = useFlash();
    const navigate = useNavigate();
    const {apiData, loading, error} = useFetchData("/admin/dashboard");

    if (error?.status === 403) {
        flash("Your authorization expired. Please reconnect")
        return navigate("/admin");
    }

    if (error) return <ErrorPage error={error}/>;
    if (loading) return <Loading/>;

    return (
        <>
            <h3 className="m-t-40">Admin Dashboard</h3>
            <HLine/>
            <PopulateUsers users={apiData}/>
        </>
    );
};


export default withPrivateRoute(AdminDashBoardPage);
