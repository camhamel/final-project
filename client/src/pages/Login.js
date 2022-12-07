import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useAppContext } from "../context";
import axios from "axios";
import { Container } from "../components/styles/Container.styled";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const contextData = useAppContext();

    // login logic
    const loginHandler = async (e) => {
        // prevents login from refreshing the page
        e.preventDefault();
        // post req to login
        try {
            const res = await axios.post("/users/login", {
                email,
                password,
            });
            // sending user from be (data: user & token), store user in context API, then store it in local storage so it can be permanent
            contextData.setUser(res.data.user);
            // creating "token" and giving it its value "data.token"
            localStorage.setItem("token", res.data.token);
            // navigate to home
            navigate("/");
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <Container>
            <Form onSubmit={loginHandler}>
                <Input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="e-mail"
                />
                <Input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="Password"
                />
                <InputButton type="submit">Log in</InputButton>
                {/* Authentication in "/server/user" */}
            </Form>
        </Container>
    );
};

export default Login;

const Form = styled.form`
    max-width: 800px;
    margin: 0 auto;
    position: absolute;
    top: 25%;
    left: 40%;
`;

const Input = styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 14px;
`;

const InputButton = styled.button`
    /* display: block;
    box-sizing: border-box;
    width: 25%;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 14px;
    text-align: center;
    margin: auto; */
`;
