import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignIn = (props) => {
    const [emailInput, setEmailInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const history = useHistory();

    // Callback for the submit button
    // this will send a POST request to try to log in
    // upon success, then store the Token
    // if fail, then display an error
    async function handleSubmit(e) {
        const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "mtchang",
                email: emailInput,
                password: pwInput,
            }),
        });
        const myJson = await response.json();

        if (response.status === 200) {
            console.log("Log in success");
            props.setTokens(myJson);
            history.push("/dashboard");
        } else {
            console.log("Error with logging in. Response: ", myJson);
        }
    }

    return (
        <div>
            <h1>Existing User? Sign In</h1>
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
        </div>
    );
};

export default SignIn;
