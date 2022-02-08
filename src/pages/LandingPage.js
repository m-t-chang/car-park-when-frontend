import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";

const LandingPage = (props) => {
    const history = useHistory();

    return (
        <div>
            <section>
                <h1>Availability Data for Singapore's Car Parks</h1>
                <p>
                    Will there by any parking spots when you arrive at your
                    destination? When is your favorite carpark the most busy?
                    These are questions that our data product can answer for
                    you. What are you waiting for?
                </p>
                <Button
                    variant="contained"
                    onClick={() => history.push("/signup")}
                >
                    Sign Up Now
                </Button>
                <p>Existing users can sign in.</p>
                <Button
                    variant="outlined"
                    onClick={() => history.push("/signin")}
                >
                    Sign In
                </Button>
            </section>
        </div>
    );
};

export default LandingPage;
