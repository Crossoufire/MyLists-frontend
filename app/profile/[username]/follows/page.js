import React from "react";
import FollowsFollowers from "@/stuff/components/profile/FollowsFollowers";


const Page = ({ params }) => {
    return (
        <FollowsFollowers
            username={params.username}
            extension="follows"
        />
    );
};


export default Page;
