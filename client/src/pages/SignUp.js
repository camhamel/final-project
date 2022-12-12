import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppContext } from "../context";
import { useNavigate } from "react-router-dom";
// const { register, handleSubmit } = useForm();
// const [data, setData] = useState("");

// import Button from "@mui/material/Button";

const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authCode, setAuthCode] = useState("");
    const contextData = useAppContext();
    // todo const [passwordConfirm, setPasswordConfirm] = useState("");

    // sign-up logic
    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/users/signup", {
                firstName,
                lastName,
                email,
                password,
                authCode,
            });
            console.log(res.data);
            contextData.setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            console.log(err.response.data);
        }
    };
    return (
        <Container>
            <Form onSubmit={signupHandler}>
                <Input
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    type="firstName"
                    placeholder="First name"
                />
                <Input
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    type="lastName"
                    placeholder="Last name"
                />
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
                {/* todo stretch goal <Input type="confirmPassword" placeholder="Confirm Password" /> */}
                <Input
                    value={authCode}
                    onChange={(e) => {
                        setAuthCode(e.target.value);
                    }}
                    type="authenticationCode"
                    placeholder="Authentication Code"
                />
                <InputButton type="submit">Sign Up</InputButton>
            </Form>
        </Container>
    );
};

export default SignUp;

//

const Container = styled.div`
    margin-left: 200px;
`;

const Form = styled.form`
    max-width: 800px;
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
    display: block;
    box-sizing: border-box;
    width: 25%;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 14px;
    text-align: center;
    margin: auto;
`;
