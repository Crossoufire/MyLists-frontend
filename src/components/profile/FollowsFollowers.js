import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Image} from "react-bootstrap";

import {useFetchData} from "../../hooks/FetchDataHook";
import HLine from "../primitives/HLine";
import Return from "../primitives/Return";
import Loading from "../primitives/Loading";
import ErrorPage from "../../pages/ErrorPage";


export default function FollowsFollowers({ username, extension }) {
    const navigate = useNavigate();
    const { apiData, loading, error } = useFetchData(`/profile/${username}/${extension}`)

    if (error) return <ErrorPage error={error}/>;
    if (loading) return <Loading addStyle={"text-center"}/>;


    return (
        <div className="m-t-30 m-b-50">
            {extension === "followers" ? <h4>Followers</h4> : <h4>Follows</h4>}
            <HLine/>
            <div className="m-t-10 cu-p" style={{display: "inline-block"}} onClick={() => navigate(-1)}>
                <Return value={"to profile"}/>
            </div>
            <div className="d-flex justify-content-start flex-wrap gap-4">
                {apiData.follows.map(user =>
                    <Link key={user.id} className="text-light m-t-25" to={`/profile/${user.username}`}>
                        <div className="text-center">
                            <Image
                                roundedCircle
                                height={75}
                                width={75}
                                style={{backgroundColor: "grey"}}
                                src={user.profile_image}
                            />
                            <h5 className="m-t-5">{user.username}</h5>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}
