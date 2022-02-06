import React from "react";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";

const LandingPage = (props) => {
    const history = useHistory();

    // this function navigates the user to the "Focus" screen
    function handleButtonOnClick(event, index) {
        history.push("/signup");
    }

    return (
        <div>
            <Button variant="contained" onClick={handleButtonOnClick}>
                Sign Up
            </Button>
        </div>
    );
};

export default LandingPage;
