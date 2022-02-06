import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUp = () => {
    const [emailInput, setEmailInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const [pwConfInput, setPwConfInput] = useState("");

    // Callback for the submit button
    // this will send a POST request and try to create a new account
    function handleSubmit(e) {
        // validate inputs
        if (pwInput !== pwConfInput) {
            console.log("Passwords must match");
            return;
        }

        // send the POST request to backend
        const body = { email: emailInput, password: pwInput };
        console.log(body);
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
        </div>
    );
};

export default SignUp;
