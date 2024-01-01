import React from "react";
import {Image, Col, Row, Card} from "react-bootstrap";

import {useFetchData} from "../hooks/FetchDataHook";
import HLine from "../components/primitives/HLine";
import Loading from "../components/primitives/Loading";
import ErrorPage from "./ErrorPage";


const RankCalculus = ({ rank, loop }) => {
	if (loop % 3 === 0) {
		let level, hours;

		level = <div>Lvl {rank.level} +</div>
		hours = <div>{((20 * rank.level * (1 + rank.level)) / 60)}h +</div>

		if (rank.level < 147) {
			level = <div>Lvl {rank.level} - Lvl {2+rank.level}</div>
			hours = <div>{((20 * rank.level*(1+rank.level))/60)}h - {(((20*(3+rank.level))*(4+rank.level))/60)}h</div>
		}

		return (
			<Col xs={6} md={4} lg={3} xl={2} className="text-center fw-5">
				<Card className="bg-card h-100 text-light">
					<Card.Body className="p-2">
						<Card.Text as="div">
							<Image src={rank.image} height={45} width={45}/>
							<div>{rank.name}</div>
							<div className="fs-17 text-grey">{level}{hours}</div>
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		)
	}
};


const MediaLevelsPage = () => {
	const { apiData, loading, error } = useFetchData("/levels/media_levels")

	if (error) return <ErrorPage error={error}/>;
	if (loading) return <Loading/>;


	return (
		<>
			<h2 className="m-t-40">Media levels</h2>
			<HLine/>
			<ul className="m-t-15 fs-18">
				<li>All grades are from the Halo Reach video game.</li>
				<li>50 grades and 150 levels. You gain a grade every 3 levels.</li>
				<li>Levels are based on your total time spent.</li>
				<li>XP = 20*lvl*(1+lvl)</li>
				<li>Level = (&#8730;(400+80*XP)-20)/40</li>
			</ul>
			<Row className="m-t-40 gy-4 m-b-50">
				{apiData.map((rank, idx) =>
					<RankCalculus
						key={idx}
						rank={rank}
						loop={idx}
					/>
				)}
			</Row>
		</>
	);
};


export default MediaLevelsPage;

