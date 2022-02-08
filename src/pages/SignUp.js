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
        }

        // send the POST request to backend
        const response = await fetch(`http://127.0.0.1:8000/api/user/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput,
                password: pwInput,
            }),
        });
        const myJson = await response.json();

        if (myJson.status === "success") {
            // redirect user
            history.push("/signin");
        } else {
            setValidationMessage(myJson.message);
        }
    }

    return (
        <div>
            <h1>Sign Up Here</h1>
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
            <TextField
                type="password"
                id="pwconf"
                label="Confirm Password"
                variant="outlined"
                value={pwConfInput}
                onChange={(e) => {
                    setPwConfInput(e.target.value);
                }}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            {validationMessage}
        </div>
    );
};

export default SignUp;
