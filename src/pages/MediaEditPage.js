import React from "react";
import {Button, Form, Row, Col} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

import {useApi} from "../providers/ApiProvider";
import {useFlash} from "../providers/FlashProvider";
import {capitalize} from "../utils/functions";
import {useFetchData} from "../hooks/FetchDataHook";
import ErrorPage from "./ErrorPage";
import Loading from "../components/primitives/Loading";
import HLine from "../components/primitives/HLine";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";


const MediaEditPage = () => {
    const api = useApi();
    const flash = useFlash();
    const navigate = useNavigate();
    const {mediaId, mediaType} = useParams();
    const {register, handleSubmit} = useForm();
    const {apiData, loading, error} = useFetchData(`/details/form/${mediaType}/${mediaId}`);

    const onSubmit = async (data) => {
        const response = await api.post(`/details/form/${mediaType}/${mediaId}`, data)

        if (!response.ok) {
            return flash("An error occurred while updating the media info.", "warning");
        }

        flash("Media successfully updated.", "success");

        return navigate(`/details/${mediaType}/${mediaId}`);
    };

    if (error) return <ErrorPage error={error}/>
    if (loading) return <Loading/>;


    // noinspection JSValidateTypes
    return (
        <div className="m-b-40">
            <h2 className="m-t-40">Edit media info</h2>
            <HLine/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col lg={6} xl={6}>
                        <div className="d-flex gap-3 flex-column col-lg-8">
                            <Form.Group controlId="formCover">
                                <Form.Label className="text-light">Image Cover URL</Form.Label>
                                <Form.Control {...register("image_cover")}/>
                            </Form.Group>
                            {apiData.fields.map(field =>
                                <Form.Group key={field[0]} controlId={`form${field[0]}`}>
                                    <Form.Label className="text-light">{capitalize(field[0])}</Form.Label>
                                    <Form.Control
                                        as={field[0] === "synopsis" ? "textarea": "input"}
                                        style={field[0] === "synopsis" ? {height: 250} : {height: "auto"}}
                                        defaultValue={field[1]}
                                        {...register(field[0])}
                                    />
                                </Form.Group>
                            )}
                        </div>
                    </Col>
                    {apiData.genres &&
                        <Col lg={6} xl={6}>
                            <div>Genres (select up to 5)</div>
                            <div><i>Maintain ctrl to select multiple</i></div>
                            <Form.Group controlId="formGenres">
                                <Form.Select multiple={true} style={{height: 400, width: 250}} {...register("genres")}>
                                    {apiData.genres?.map(genre => <option key={genre}>{genre}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    }
                </Row>
                <div className="d-flex justify-content-center">
                    <Button className="m-t-40" variant="primary" type="submit">Update</Button>
                </div>
            </Form>
        </div>
    );
};


export default withPrivateRoute(MediaEditPage);
