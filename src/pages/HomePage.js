import React from "react";
import {Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import {FaBootstrap, FaCode, FaComments, FaDollarSign, FaGithub, FaSmile} from "react-icons/fa";

import {maxWidthHomePage, mail} from "../utils/constants";
import LoginForm from "../components/homepage/LoginForm";
import RegisterForm from "../components/homepage/RegisterForm";
import HLine from "../components/primitives/HLine";


const HomePage = () => (
	<>
		<div className="homepage-image-header"/>
		<div className="homepage-title-container">
			<h1 className="homepage-title text-center m-b-40">Welcome to MyLists</h1>
			<div className="d-flex justify-content-center m-t-30">
				<Card id="cred-homepage" className="bg-card homepage-cred-container">
					<Tabs fill defaultActiveKey="login" variant="underline" className="mb-3" data-bs-theme="dark">
						<Tab eventKey="login" title="Login">
							<LoginForm/>
						</Tab>
						<Tab eventKey="register" title="Register">
							<RegisterForm/>
						</Tab>
					</Tabs>
				</Card>
			</div>
		</div>
		<div className="m-l-r-auto text-light" style={{maxWidth: maxWidthHomePage}}>
			<section className="main-text m-t-30">
				<Row className="gy-3">
					<Col md={4} xl={4}>
						<Card className="bg-card h-100 text-light">
							<Card.Body className="p-3">
								<Card.Title>Create your lists</Card.Title>
								<HLine/>
								<Card.Text>
									Currently, we support TV shows/series, anime, movies, games and books list.
									Get an overall view in one place!
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4} xl={4}>
						<Card className="bg-card h-100 text-light">
							<Card.Body className="p-3">
								<Card.Title>Check your time spent</Card.Title>
								<HLine/>
								<Card.Text>
									See how much time you have spent, level up, add score or feels to each media,
									and get on top of the Hall of Fame!
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4} xl={4}>
						<Card className="bg-card h-100 text-light">
							<Card.Body className="p-3">
								<Card.Title>Follows people</Card.Title>
								<HLine/>
								<Card.Text>
									See what your follows watched, read or played, get recommendations,
									and stay updated!
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</section>
			<section className="mylists-info m-t-40 m-b-10">
				<Row className="gy-3">
					<Col md={4} xl={4}>
						<Row>
							<Col xl={2}>
								<FaBootstrap size={40}/>
							</Col>
							<Col xl={10} className="mb-2">
								<h4 className="mb-1"><b>Responsive</b></h4>
								<p className="mt-2">
									Fully responsive created with MDBReact.
									Supports PC, tablets, mobile and TV.
								</p>
							</Col>
						</Row>
					</Col>
					<Col md={4} xl={4}>
						<Row>
							<Col xl={2}>
								<FaGithub size={40}/>
							</Col>
							<Col xl={10} className="mb-2">
								<h4 className="mb-1"><b>Open Source</b></h4>
								<p className="mt-2">
									Totally open source, made with&nbsp;
									<a href="https://flask.palletsprojects.com/" target="_blank"
									   rel="noreferrer">Flask </a>
									and <a href="https://react.dev" target="_blank" rel="noreferrer"> React</a>.
									You can find the source code on&nbsp;
									<a href="https://www.github.com/Crossoufire/MyLists" target="_blank"
									   rel="noreferrer">Github</a>.
								</p>
							</Col>
						</Row>
					</Col>
					<Col md={4} xl={4}>
						<Row>
							<Col xl={2}>
								<FaDollarSign size={40}/>
							</Col>
							<Col xl={10} className="mb-2">
								<h4 className="mb-1"><b>No ads &amp; 100% free</b></h4>
								<p className="mt-2">
									You will not find any ads, we don't do that here. You only need to
									create an account to access all the content.
								</p>
							</Col>
						</Row>
					</Col>
					<Col md={4} xl={4}>
						<Row>
							<Col xl={2}>
								<FaComments size={40}/>
							</Col>
							<Col xl={10} className="mb-2">
								<h4 className="mb-1"><b>Found a bug?</b></h4>
								<p className="mt-2">You can contact us by e-mail at:
									<a href={"mailto:" + mail}> {mail}</a>
								</p>
							</Col>
						</Row>
					</Col>
					<Col md={4} xl={4}>
						<Row>
							<Col xl={2}>
								<FaSmile size={40}/>
							</Col>
							<Col xl={10} className="mb-2">
								<h4 className="mb-1"><b>Made by me with ❤</b></h4>
								<p className="mt-2">
									Built and kept alive only by me on my spare time.
								</p>
							</Col>
						</Row>
					</Col>
					<Col md={4} xl={4}>
						<Row>
							<Col xl={2}>
								<FaCode size={40}/>
							</Col>
							<Col xl={10} className="mb-2">
								<h4 className="mb-1"><b>New features coming</b></h4>
								<p className="mt-2">
									I have still ideas, just not enough time. Stay tuned!
								</p>
							</Col>
						</Row>
					</Col>
				</Row>
			</section>
		</div>
	</>
);


export default HomePage;

