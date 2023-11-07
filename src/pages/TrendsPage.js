import {useNavigate} from "react-router-dom";
import {Col, Row, Tab, Tabs} from "react-bootstrap";

import {useApi} from "../contexts/ApiProvider";
import {useFlash} from "../contexts/FlashProvider";
import {useFetchData} from "../hooks/FetchDataHook";
import Loading from "../components/primitives/Loading";
import ErrorPage from "./ErrorPage";
import TrendItem from "../components/trends/TrendItem";


export default function TrendsPage() {
    const api = useApi();
    const flash = useFlash();
    const navigate = useNavigate();
    const { apiData, loading, error } = useFetchData("/current_trends")

    const addMediaToDb = async (mediaType, apiId) => {
        const response = await api.post(`/add_media_to_db/${mediaType}/${apiId}`);

        if (!response.ok) {
            return flash(response.body.message, "danger");
        }

        navigate(`/details/${mediaType}/${response.body.media_id}`);
    };

    if (error?.status) {
        return <ErrorPage {...error}/>
    }

    if (loading) {
        return <Loading />;
    }


    return (
        <div id="trends-tabs">
            <Tabs defaultActiveKey="series" className="bg-card fs-20 m-t-40 m-b-20" data-bs-theme="dark">
                <Tab eventKey="series" title="Trending TV">
                    <Row className="m-b-50 gy-4">
                        {apiData.tv_trends.map((media, idx) =>
                            <Col key={media.api_id} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <TrendItem
                                    media={media}
                                    addMediaToDb={addMediaToDb}
                                    idx={idx}
                                />
                            </Col>
                        )}
                    </Row>
                </Tab>
                <Tab eventKey="movies" title="Trending Movies">
                    <Row className="m-b-50 gy-4">
                        {apiData.movies_trends.map((media, idx) =>
                            <Col key={media.api_id} xs={12} sm={6} md={6} lg={6} xl={4}>
                                <TrendItem
                                    media={media}
                                    addMediaToDb={addMediaToDb}
                                    idx={idx}
                                />
                            </Col>
                        )}
                    </Row>
                </Tab>
            </Tabs>
        </div>
    )
}
