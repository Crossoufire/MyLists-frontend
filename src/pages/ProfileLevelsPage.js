import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Image, Col, Row, Card} from "react-bootstrap";

import {useApi} from "../contexts/ApiProvider";
import HLine from "../components/primitives/HLine";


function BorderCalcul({ border }) {
	if (8 * border.level < 320) {
		return (
			<div className="text-center fs-20" style={{marginTop: "-25px"}}>
				Lvl {8*(-1+border.level)} - Lvl {-1+8*(border.level)}
			</div>
		)
	}

	return <div className="text-center fs-20" style={{marginTop: "-20px"}}>Lvl {8*(-1+border.level)} +</div>
}


export default function ProfileLevelsPage() {
	const [borderData, setBorderData] = useState([]);
	const api = useApi();


	useEffect(() => {
		(async () => {
			const response = await api.get("/levels/profile_borders");
			setBorderData(response.body.data);
		})();
	}, [api]);


	return (
		<>
			<h2 className="m-t-40">Profile borders</h2>
			<HLine/>
			<ul className="fs-18 m-t-20 m-b-40">
				<li>Borders created by <Link to={"/profile/Psy"}>Psy</Link> using Freepik images.</li>
				<li>40 borders. New border every 8 levels.</li>
				<li>New border until level 312.</li>
				<li>Level = ((((400+ 80 * <u>totalTime</u>) ** (1/2)) - 20) / 40).</li>
			</ul>
			<Row className="gy-4">
				{borderData.map((border, idx) => {
					return (
						<Col xs={6} md={4} lg={3} xl={2} key={idx} className="text-center fw-5">
							<Card className="bg-card text-light">
								<Card.Body className="p-2">
									<Card.Text as={"div"}>
										<Image
											style={{marginTop: "-25px"}}
											src={border.image}
											height={170}
											width={170}
										/>
										<BorderCalcul
											border={border}
										/>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					)
				})}
			</Row>
		</>
	);
}

