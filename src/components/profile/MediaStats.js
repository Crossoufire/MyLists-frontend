import React from "react";
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import {Col, Image, Row} from "react-bootstrap";
import {FaExternalLinkAlt} from "react-icons/fa";

import {capitalize, getStatusColor} from "../../utils/functions";
import MetricDistribution from "./MetricDistribution";
import HLine from "../primitives/HLine";


// export default function MediaStats({ user, media }) {
//     const [caret, setCaret] = useState(FaCaretDown);
//     const [verso, setVerso] = useState(true);
//     const [isOpen, setIsOpen] = useState(true);
//
//     const toggleCollapse = () => {
//         setIsOpen(!isOpen);
//         !isOpen ? setCaret(FaCaretDown) : setCaret(FaCaretRight);
//     }
//     const toggleVerso = () => setVerso(!verso);
//
//
//     return (
//         <Card className="bg-card mb-3 text-light">
//             <Card.Body className="p-3">
//                 <Card.Title>
//                     <h5 className="d-flex justify-content-between fw-5">
//                         <div className="cu-p" onClick={toggleCollapse}>{caret} &nbsp;{media.media_name}</div>
//                         <div>
//                             {parseInt(media.time_days)} days
//
//                             {Math.max(...media.count_per_metric) !== 0 &&
//                                 <>
//                                     &nbsp;&nbsp;|&nbsp;
//                                     <FaChevronRight
//                                         id={"verso-" + media.media_type}
//                                         className={"cu-p text-" + media.media_type}
//                                         onClick={toggleVerso}
//                                     />
//                                     <Tooltip
//                                         style={{zIndex: 5}}
//                                         anchorId={"verso-" + media.media_type}
//                                         content={"Flip Card"}
//                                     />
//                                 </>
//                             }
//                         </div>
//                     </h5>
//                 </Card.Title>
//                 <HLine color={"text-"+media.media_type}/>
//                 {isOpen &&
//                     <>
//                         {verso ?
//                             <MediaCard
//                                 user={user}
//                                 media={media}
//                             />
//                             :
//                             <RectoMediaCard
//                                 feeling={user.add_feeling}
//                                 metric={media.count_per_metric}
//                                 mediaType={media.media_type}
//                             />
//                         }
//                     </>
//                 }
//             </Card.Body>
//         </Card>
//     );
// }


// export default function MediaStats({ user, media, stats }) {
//     const styleStats = mediaStats[media.media_type]
//
//     return (
//         <Card className="bg-card mb-3 text-light">
//             <Card.Body className="p-3">
//                 <Card.Title>
//                     <h5 className="d-flex justify-content-between fw-5">
//                         <div>{capitalize(media.media_type)}</div>
//                         <div>{parseInt(media.time_days)} days</div>
//                     </h5>
//                 </Card.Title>
//                 <HLine color={`text-${media.media_type}`}/>
//                 <MediaCard
//                     user={user}
//                     media={media}
//                 />
//                 {Math.max(...media.count_per_metric) !== 0 &&
//                     <RectoMediaCard
//                         feeling={user.add_feeling}
//                         metric={media.count_per_metric}
//                         mediaType={media.media_type}
//                     />
//                 }
//                 <Tabs defaultActiveKey="" variant="pills" className="mb-3 justify-content-around" data-bs-theme="dark">
//                     <Tab eventKey={stats[0].name} title={stats[0].name}>
//                         <StatsCard
//                             graphType={styleStats.graphType[0]}
//                             data={stats[0].values}
//                             fillColor={styleStats.fillColor}
//                             formatter={styleStats.formatter[0]}
//                             leftVal={styleStats.lefVal[0]}
//                         />
//                     </Tab>
//                     <Tab eventKey={stats[1].name} title={stats[1].name}>
//                         <StatsCard
//                             graphType={styleStats.graphType[1]}
//                             data={stats[1].values}
//                             fillColor={styleStats.fillColor}
//                             formatter={styleStats.formatter[1]}
//                             leftVal={styleStats.lefVal[1]}
//                         />
//                     </Tab>
//                     <Tab eventKey={stats[2].name} title={stats[2].name}>
//                         <Row className="m-l-20 gy-3">
//                             {stats[2].values.map(data =>
//                                 <>
//                                     <Col xl={1}>{data[1]}</Col>
//                                     <Col xl={5}>{data[0]}</Col>
//                                 </>
//                             )}
//                         </Row>
//                     </Tab>
//                     <Tab eventKey={stats[3].name} title={stats[3].name}>
//                         <Row className="m-l-20 gy-3">
//                             {stats[3].values.map(data =>
//                                 <>
//                                     <Col xl={1}>{data[1]}</Col>
//                                     <Col xl={5}>{data[0]}</Col>
//                                 </>
//                             )}
//                         </Row>
//                     </Tab>
//                     <Tab eventKey={stats[4].name} title={stats[4].name}>
//                         <Row className="m-l-20 gy-3">
//                             {stats[4].values.map(data =>
//                                 <>
//                                     <Col xl={1}>{data[1]}</Col>
//                                     <Col xl={5}>{data[0]}</Col>
//                                 </>
//                             )}
//                         </Row>
//                     </Tab>
//                     <Tab eventKey={stats[5].name} title={stats[5].name}>
//                         <Row className="m-l-20 gy-3">
//                             {stats[5].values.map(data =>
//                                 <>
//                                     <Col xl={1}>{data[1]}</Col>
//                                     <Col xl={5}>{data[0]}</Col>
//                                 </>
//                             )}
//                         </Row>
//                     </Tab>
//                 </Tabs>
//             </Card.Body>
//         </Card>
//     );
// }


// export default function MediaStats({ user, media, stats }) {
//     const [statsStyle, setStatStyle] = useState(mediaStats[media.media_type]);
//
//     useEffect(() => {
//         setStatStyle(mediaStats[media.media_type]);
//     }, [media]);
//
//
//     return (
//         <>
//             <h5 className="m-t-15 d-flex justify-content-between fw-5">
//                 <div>{capitalize(media.media_type)}</div>
//                 <div>{parseInt(media.time_days)} days</div>
//             </h5>
//             <HLine/>
//             <div className="d-flex flex-column gap-2">
//                 <div className="d-flex flex-wrap justify-content-between text-center fw-5">
//                     <div>
//                         <div className="fs-14 text-gloom">Hours</div>
//                         <div>{media.time_hours}</div>
//                     </div>
//                     {media.media_type !== "games" &&
//                         <div>
//                             <div className="fs-14 text-gloom">
//                                 {media.media_type === "books" && <>Pages</>}
//                                 {media.media_type === "movies" && <>Watched</>}
//                                 {["series", "anime"].includes(media.media_type) && <>Episodes</>}
//                             </div>
//                             <div>{media.specific_total}</div>
//                         </div>
//                     }
//                     <div>
//                         <div className="fs-14 text-gloom">Media</div>
//                         <div>{media.total_media}</div>
//                     </div>
//                     {!user.add_feeling &&
//                         <div>
//                             <div className="fs-14 text-gloom">Score</div>
//                             <div>{media.mean_metric.toFixed(2)}</div>
//                         </div>
//                     }
//                     <div>
//                         <div className="fs-14 text-gloom">Scored</div>
//                         <div>{media.media_metric}/{media.total_media}</div>
//                     </div>
//                 </div>
//                 <div className="block-chart">
//                     {media.no_data ?
//                         <span className="block" style={{backgroundColor: "black"}}/>
//                         :
//                         media.status_count.map(status =>
//                             <React.Fragment key={`${status.status}-${media.media_type}`}>
//                             <span id={`${status.status}-${media.media_type}`} className="block"
//                                   style={{width: `${status.percent}%`, backgroundColor: getStatusColor(status.status)}}/>
//                                 <Tooltip
//                                     anchorId={`${status.status}-${media.media_type}`}
//                                     content={status.status}
//                                 />
//                             </React.Fragment>
//                         )
//                     }
//                 </div>
//                 <Row className="fw-5 fs-15 gy-2">
//                     {media.status_count.map(s =>
//                         <React.Fragment key={`${s.status}-${media.media_type}`}>
//                             <Col className="col-4 one-line-ellipsis">
//                                 <Link to={`/list/${media.media_type}/${user.username}?status=${s.status}`}
//                                       className="text-gloom fw-5">
//                                     <div className="colored-bullet" style={{backgroundColor: getStatusColor(s.status)}}/>
//                                     {s.status}
//                                 </Link>
//                             </Col>
//                             <Col className="col-2">{s.count}</Col>
//                         </React.Fragment>
//                     )}
//                 </Row>
//                 {media.total_favorites > 0 &&
//                     <div className="fw-5 fs-18 m-t-10">
//                         <Link className="text-light" to={`/list/${media.media_type}/${user.username}?status=Favorite`}>
//                             Favorites ({media.total_favorites})
//                         </Link>
//                         <div className="d-flex flex-wrap justify-content-start gap-2 m-t-5">
//                             {media.favorites.map(m =>
//                                 <Link key={m.media_name} to={`/details/${media.media_type}/${m.media_id}`}>
//                                     <Image
//                                         id={`${media.media_type}_${m.media_id}`}
//                                         style={{borderRadius: 4}}
//                                         height={81}
//                                         src={m.media_cover}
//                                     />
//                                     <Tooltip
//                                         anchorId={`${media.media_type}_${m.media_id}`}
//                                         content={m.media_name}
//                                     />
//                                 </Link>
//                             )}
//                         </div>
//                     </div>
//                 }
//                 {Math.max(...media.count_per_metric) !== 0 &&
//                     <MetricDistribution
//                         feeling={user.add_feeling}
//                         metric={media.count_per_metric}
//                         mediaType={media.media_type}
//                     />
//                 }
//                 <div className="fw-5 fs-18">
//                     <Link className="text-light" to={`/list/${media.media_type}/${user.username}?status=Stats`}>
//                         Detailed stats
//                     </Link>
//                 </div>
//                 <Tabs fill variant="pills" defaultActiveKey="" className="m-b-15 justify-content-around" data-bs-theme="dark">
//                     {stats.map((s, idx) =>
//                         <Tab key={`${s.name}-${media.media_type}`} eventKey={s.name} title={s.name}>
//                             <StatsCard
//                                 data={s.values}
//                                 graphType={statsStyle.graphType[idx]}
//                                 fillColor={statsStyle.fillColor}
//                                 formatter={statsStyle.formatter[idx]}
//                                 leftVal={statsStyle.lefVal[idx]}
//                             />
//                         </Tab>
//                     )}
//                 </Tabs>
//             </div>
//         </>
//     )
// }


export default function MediaStats({ user, media }) {
    return (
        <div className="d-flex flex-column gap-4 m-t-15">
            <div>
                <h5 className="d-flex justify-content-between fw-5">
                    <div>{capitalize(media.media_type)}</div>
                    <div>{parseInt(media.time_days)} days</div>
                </h5>
                <HLine color={`text-${media.media_type}`}/>
                <div className="d-flex flex-wrap justify-content-between text-center fw-5">
                    <div>
                        <div className="fs-14 text-gloom">Hours</div>
                        <div>{media.time_hours}</div>
                    </div>
                    {media.media_type !== "games" &&
                        <div>
                            <div className="fs-14 text-gloom">
                                {media.media_type === "books" && <>Pages</>}
                                {media.media_type === "movies" && <>Watched</>}
                                {["series", "anime"].includes(media.media_type) && <>Episodes</>}
                            </div>
                            <div>{media.specific_total}</div>
                        </div>
                    }
                    <div>
                        <div className="fs-14 text-gloom">Media</div>
                        <div>{media.total_media}</div>
                    </div>
                    {!user.add_feeling &&
                        <div>
                            <div className="fs-14 text-gloom">Score</div>
                            <div>{media.mean_metric.toFixed(2)}</div>
                        </div>
                    }
                    <div>
                        <div className="fs-14 text-gloom">Scored</div>
                        <div>{media.media_metric}/{media.total_media}</div>
                    </div>
                </div>
                <div className="block-chart m-t-10 m-b-10">
                    {media.no_data ?
                        <span className="block" style={{backgroundColor: "black"}}/>
                        :
                        media.status_count.map(status =>
                            <React.Fragment key={`${status.status}-${media.media_type}`}>
                            <span
                                id={`${status.status}-${media.media_type}`}
                                className="block"
                                style={{width: `${status.percent}%`, backgroundColor: getStatusColor(status.status)}}
                            />
                                <Tooltip
                                    anchorId={`${status.status}-${media.media_type}`}
                                    content={status.status}
                                />
                            </React.Fragment>
                        )
                    }
                </div>
                <Row className="fw-5 fs-15 gy-2">
                    {media.status_count.map(s =>
                        <React.Fragment key={`${s.status}-${media.media_type}`}>
                            <Col className="col-4 one-line-ellipsis">
                                <Link to={`/list/${media.media_type}/${user.username}?status=${s.status}`}
                                      className="text-gloom fw-5">
                                    <div className="colored-bullet" style={{backgroundColor: getStatusColor(s.status)}}/>
                                    {s.status}
                                </Link>
                            </Col>
                            <Col className="col-2">{s.count}</Col>
                        </React.Fragment>
                    )}
                </Row>
            </div>
            <div>
                <Link className="text-light fw-5 fs-18" to={`/list/${media.media_type}/${user.username}?status=Favorite`}>
                    Favorites ({media.total_favorites})
                </Link>
                {media.total_favorites === 0 ?
                    <div className="text-grey m-t-15"><i>No favorites added yet</i></div>
                    :
                    <div className="d-flex flex-wrap justify-content-start gap-2 m-t-5">
                        {media.favorites.map(m =>
                            <Link key={m.media_name} to={`/details/${media.media_type}/${m.media_id}`}>
                                <Image
                                    id={`${media.media_type}_${m.media_id}`}
                                    style={{borderRadius: 4}}
                                    height={81}
                                    src={m.media_cover}
                                />
                                <Tooltip
                                    anchorId={`${media.media_type}_${m.media_id}`}
                                    content={m.media_name}
                                />
                            </Link>
                        )}
                    </div>
                }
            </div>
            <MetricDistribution
                isFeeling={user.add_feeling}
                metricCount={media.count_per_metric}
                mediaType={media.media_type}
            />
            <div className="fw-5 fs-18">
                <Link className="text-light" to={`/list/${media.media_type}/${user.username}?status=Stats`}>
                    Detailed stats &nbsp;<FaExternalLinkAlt size={16}/>
                </Link>
            </div>
        </div>
    )
}