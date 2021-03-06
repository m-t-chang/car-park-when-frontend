import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUp = () => {
    const [emailInput, setEmailInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const [pwConfInput, setPwConfInput] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const history = useHistory();

    // Callback for the submit button
    // this will send a POST request and try to create a new account
    async function handleSubmit(e) {
        // validate inputs
        if (pwInput !== pwConfInput) {
            setValidationMessage("Passwords must match");
            return;
        }
        if (
            !emailInput.includes("@") ||
            emailInput.includes(" ") ||
            !emailInput.includes(".")
        ) {
            setValidationMessage("Enter a valid email");
            return;
        }

        // send the POST request to backend
        console.log("Sending request...");
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URI}/api/user/signup/`,
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

        if (myJson.status === "success") {
            // redirect user
            history.push("/signin");
        } else {
            setValidationMessage(myJson.message);
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>New User? Sign Up Here!</h1>
            <TextField
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                value={emailInput}
                onChange={(e) => {
                    setEmailInput(e.target.value);
                }}
                margin="normal"
                sx={{ width: "30ch" }}
            />
            <br />
            <TextField
                type="password"
                id="pw"
                label="Password"
                variant="outlined"
                value={pwInput}
                onChange={(e) => {
                    setPwInput(e.target.value);
                }}
                margin="normal"
                sx={{ width: "30ch" }}
            />
            <br />
            <TextField
                type="password"
                id="pwconf"
                label="Confirm Password"
                variant="outlined"
                value={pwConfInput}
                onChange={(e) => {
                    setPwConfInput(e.target.value);
                }}
                margin="normal"
                sx={{ width: "30ch" }}
            />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            {validationMessage}
        </div>
    );
};

export default SignUp;
