"use client";
import {Card, Tabs, Tab} from "react-bootstrap";

import LoginForm from "@/stuff/components/homepage/LoginForm";
import RegisterForm from "@/stuff/components/homepage/RegisterForm";


const Authentication = () => {
    return (
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
    );
};

export default Authentication;
