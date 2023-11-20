import React from "react";
import {Card, Tab, Tabs} from "react-bootstrap";

import {capitalize} from "../../utils/functions";
import MediaStats from "./MediaStats";


// export default function MediaDetails({ username, apiData }) {
//     const api = useApi();
//     const flash = useFlash();
//     const [loading, setLoading] = useState(false);
//     const [mediaData, setMediaData] = useState({series: apiData.media_data});
//     const [selectedMediaType, setSelectedMediaType] = useState(apiData.media_data.media_type);
//
//     useEffect(() => {
//         setMediaData({series: apiData.media_data});
//     }, [apiData]);
//
//     const handleMediaDetails = async (mediaType) => {
//         setSelectedMediaType(mediaType);
//
//         if (!mediaData[mediaType]) {
//             setLoading(true);
//             const response = await api.get(`/profile/${username}/media/details/${mediaType}`);
//
//             if (!response.ok) {
//                 setLoading(false);
//                 return flash(response.body.message, "danger");
//             }
//
//             setMediaData({
//                 ...mediaData,
//                 [mediaType]: response.body.data,
//             });
//         }
//
//         setLoading(false);
//     };
//
//
//     return (
//         <Card className="bg-card text-light">
//             <Card.Body>
//                 <Tabs defaultActiveKey="series" activeKey={selectedMediaType} data-bs-theme="dark"
//                       onSelect={(mediaType) => handleMediaDetails(mediaType)}>
//                     {apiData.list_levels.map(data =>
//                         <Tab key={data.media_type} eventKey={data.media_type} title={capitalize(data.media_type)}>
//                             {loading ?
//                                 <Loading style={null}/>
//                                 :
//                                 mediaData[data.media_type] && (
//                                     <MediaStats
//                                         user={apiData.user_data}
//                                         media={mediaData[data.media_type]}
//                                         stats={mediaData[data.media_type].stats}
//                                     />
//                                 )}
//                         </Tab>
//                     )}
//                 </Tabs>
//             </Card.Body>
//         </Card>
//     );
// }


export default function MediaDetails({ mediaData, userData }) {
    return (
        <Card className="bg-card text-light">
            <Card.Body>
                <Tabs fill defaultActiveKey="series" data-bs-theme="dark">
                    {mediaData.map(mt =>
                        <Tab key={mt.media_type} eventKey={mt.media_type} title={capitalize(mt.media_type)}>
                            <MediaStats
                                user={userData}
                                media={mt}
                            />
                        </Tab>
                    )}
                </Tabs>
            </Card.Body>
        </Card>
    );
}