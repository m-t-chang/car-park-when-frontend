import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignIn = (props) => {
    const [emailInput, setEmailInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    // Callback for the submit button
    // this will send a POST request to try to log in
    // upon success, then store the Token
    // if fail, then display an error
    async function handleSubmit(e) {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URI}/api/token/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: pwInput,
                }),
            }
        );
        const myJson = await response.json();

        if (response.status === 200) {
            console.log("Log in success");
            props.setTokens(myJson);
            props.setSignedInFlag(true);
            props.setUser({ email: emailInput });
            history.push("/dashboard");
        } else {
            console.log("Error with logging in. Response: ", myJson);
            setMessage(myJson.detail);
        }
    }

    useEffect(() => {
        console.log(props.signedInFlag);
        if (props.signedInFlag) {
            history.push("/dashboard");
        }
    });

    return (
        <div>
            <h1>Existing User? Sign In</h1>
            <div>
                <TextField
                    type="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={emailInput}
                    onChange={(e) => {
                        setEmailInput(e.target.value);
                    }}
                />
                <TextField
                    type="password"
                    id="pw"
                    label="Password"
                    variant="outlined"
                    value={pwInput}
                    onChange={(e) => {
                        setPwInput(e.target.value);
                    }}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Sign In
                </Button>
                <p style={{ color: "red" }}>{message}</p>
            </div>
        </div>
    );
};

export default SignIn;
