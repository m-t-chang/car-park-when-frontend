import React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUp = () => {
    return (
        <div>
            <h1>Sign Up Here</h1>
            <TextField id="email" label="Email" variant="outlined" />
            <TextField id="pw" label="Password" variant="outlined" />
            <TextField
                id="pwconf"
                label="Confirm Password"
                variant="outlined"
            />
            <Button variant="contained">Submit</Button>
        </div>
    );
};

export default SignUp;
