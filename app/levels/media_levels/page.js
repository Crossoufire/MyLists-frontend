import {Image, Col, Row, Card} from "react-bootstrap";
import HLine from "@/stuff/components/primitives/HLine";
import MyListsApiClient from "@/stuff/api/MyListsApiClient";


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
					<div className="p-2">
						<div>
							<Image src={rank.image} height={45} width={45} alt="rank"/>
							<div>{rank.name}</div>
							<div className="fs-17 text-grey">{level}{hours}</div>
						</div>
					</div>
				</Card>
			</Col>
		)
	}
};


const Page = async () => {
	const api = new MyListsApiClient();
	const response = await api.get("/levels/media_levels");
	const apiData = response.body.data;

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


export default Page;

