import Link from "next/link";
import {Image, Col, Row, Card} from "react-bootstrap";
import HLine from "@/stuff/components/primitives/HLine";
import MyListsApiClient from "@/stuff/api/MyListsApiClient";


const BorderCalculus = ({ border }) => {
	if (8 * border.level < 320) {
		return (
			<div className="text-center fs-20" style={{marginTop: "-25px"}}>
				Lvl {8*(-1+border.level)} - Lvl {-1+8*(border.level)}
			</div>
		)
	}

	return <div className="text-center fs-20" style={{marginTop: "-20px"}}>Lvl {8*(-1+border.level)} +</div>
};


const Page = async () => {
	const api = new MyListsApiClient();
	const response = await api.get("/levels/profile_borders")
	const apiData = response.body.data;

	return (
		<>
			<h2 className="m-t-40">Profile borders</h2>
			<HLine/>
			<ul className="fs-18 m-t-20 m-b-40">
				<li>Borders created by <Link href={"/profile/Psy"}>Psy</Link> using Freepik images.</li>
				<li>40 borders. New border every 8 levels.</li>
				<li>New border until level 312.</li>
				<li>Level = ((((400+ 80 * <u>totalTime</u>) ** (1/2)) - 20) / 40).</li>
			</ul>
			<Row className="gy-4">
				{apiData.map((border, idx) =>
					<Col xs={6} md={4} lg={3} xl={2} key={idx} className="text-center fw-5">
						<Card className="bg-card text-light">
							<div className="p-2">
								<div>
									<Image
										style={{marginTop: -25}}
										src={border.image}
										height={170}
										width={170}
										alt="profile_level"
									/>
									<BorderCalculus
										border={border}
									/>
								</div>
							</div>
						</Card>
					</Col>
				)
				}
			</Row>
		</>
	);
};


export default Page;

