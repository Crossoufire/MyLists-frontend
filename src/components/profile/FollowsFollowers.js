import React from "react";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";

import HLine from "../primitives/HLine";
import Return from "../primitives/Return";
import Loading from "../primitives/Loading";
import {useFetchData} from "../../hooks/FetchDataHook";
import ErrorPage from "../../pages/ErrorPage";


export default function FollowsFollowers({ username, extension }) {
    const { apiData, loading, error } = useFetchData("/profile/"+username+"/"+extension)

    if (error?.status) {
        return <ErrorPage {...error}/>
    }

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="m-t-30 m-b-50">
            {extension === "followers" ? <h4>Followers</h4> : <h4>Follows</h4>}
            <HLine/>
            <Link className="text-light" to={"/profile/"+username}>
                <Return value={"profile"}/>
            </Link>
            <div className="d-flex justify-content-start flex-wrap gap-4">
                {apiData.follows.map(user =>
                    <Link key={user.id} className="text-light m-t-25" to={"/profile/"+user.username}>
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
