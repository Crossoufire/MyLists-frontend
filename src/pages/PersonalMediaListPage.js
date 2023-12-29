import React, {useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {Card, Col, Image, Row} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";

import AddTooltip from "../components/primitives/AddTooltip";
import {useUser} from "../providers/UserProvider";
import {useFetchData} from "../hooks/FetchDataHook";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import NavigationMedia from "../components/medialist/NavigationMedia";
import HLine from "../components/primitives/HLine";
import Loading from "../components/primitives/Loading";
import ErrorPage from "./ErrorPage";
import Return from "../components/primitives/Return";
import useApiUpdater from "../hooks/UserUpdateAPI";
import {useApi} from "../providers/ApiProvider";
import {useFlash} from "../providers/FlashProvider";


const ShowItemsInList = ({ listName, mediaType, username }) => {
    const { apiData, loading, error } = useFetchData(`/media_in_list/${mediaType}/${username}`, {
        list: listName,
    });

    if (error) return <ErrorPage error={error}/>
    if (loading) return <Loading/>;

    return (
        <>
            {apiData.map(media =>
                <Col key={media.id} xs={4} sm={3} md={3} lg={2} xl={2}>
                    <Card className="bg-transparent border-0">
                        <div className="overlay-container">
                            <Image
                                className={`medialist-img`}
                                src={media.media_cover}
                                height={300}
                                width={200}
                                style={{height: "auto"}}
                            />
                            <Link className="overlay" to={`/details/${mediaType}/${media.media_id}`}>
                                <span className="overlay-text text-light fs-24">
                                    {media.media_name}
                                </span>
                            </Link>
                        </div>
                    </Card>
                </Col>
            )}
        </>
    );
};


const ShowAllLists = ({ initListNames, mediaType, username, isCurrent }) => {
    const api = useApi();
    const flash = useFlash();
    const [listNames, setListNames] = useState(initListNames);

    const removeFromList = async (name) => {
        const confirm = window.confirm("Do you really want to delete this personal list?");

        if (confirm) {
            const response = await api.post("/remove_personal_list", {
                list_name: name,
                media_type: mediaType,
            });

            if (!response.ok) {
                return flash(response.body.description, "warning");
            }

            flash(response.body.message, "success");
            setListNames(listNames.filter(na => na !== name));
        }
    };

    return (
        <>
            {listNames.map(name =>
                <Col key={name} xs={4} sm={3} md={3} lg={2} xl={2}>
                    <Card className="border-0">
                        <Image
                            className={`medialist-img bg-dark`}
                            height={150}
                            width={250}
                            style={{height: "auto", borderRadius: 0}}
                        />
                        <Link to={`/list/personal/${mediaType}/${username}?list=${name}`}>
                            <span className="overlay-text text-light fs-24">{name}</span>
                        </Link>
                        {isCurrent &&
                            <AddTooltip title="Delete list">
                                <span className="img-btn-top-right-2">
                                    <FaTrash size={18} onClick={() => removeFromList(name)}/>
                                </span>
                            </AddTooltip>
                        }
                    </Card>
                </Col>
            )}
        </>
    );
}



const PersonalMediaListPage = () => {
    const { currentUser } = useUser();
    const { mediaType, username } = useParams();
    const [searchParams] = useSearchParams(undefined);
    const { apiData, error } = useFetchData(`/list/personal/${mediaType}/${username}`);
    const name = currentUser.username === username ? "Your" : username;

    if (error) return <ErrorPage error={error}/>
    if (apiData === undefined || mediaType !== apiData.media_type) return <Loading/>;


    return (
        <>
            <div className="d-flex media-navigation gap-4 m-t-35">
                <NavigationMedia
                    userData={apiData.user_data}
                    mediaType={mediaType}
                    path="list/personal"
                />
            </div>
            <h3 className="m-t-30">
                {searchParams.get("list") ?
                    `${searchParams.get("list")}'s list`
                    :
                    <span>{`${name} ${mediaType}'s personal lists`}</span>
                }
            </h3>
            <HLine/>
            <Row className="gy-lg-4 gx-lg-4 g-0 m-b-30">
                {searchParams.get("list") ?
                    <>
                        <Link className="text-light" to={`/list/personal/${mediaType}/${username}`}>
                            <Return value={"to lists"}/>
                        </Link>
                        <ShowItemsInList
                            listName={searchParams.get("list")}
                            mediaType={mediaType}
                            username={username}
                        />
                    </>
                    :
                    <ShowAllLists
                        mediaType={mediaType}
                        username={username}
                        initListNames={apiData.media_data}
                        isCurrent={name === "Your"}
                    />
                }
            </Row>
        </>
    );
};


export default withPrivateRoute(PersonalMediaListPage);