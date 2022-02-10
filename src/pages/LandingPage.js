import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const LandingPage = (props) => {
    const history = useHistory();

    return (
        <div
            style={{
                backgroundColor: "red",
                backgroundImage: `url("/hdb_carpark.jpeg")`,
                backgroundSize: "cover",
                padding: "5rem 8rem",
            }}
        >
            <Paper
                sx={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding: "0.5rem 2rem 2rem 2rem",
                    borderRadius: "1rem",
                }}
            >
                <h1>Carpark Data for Informed Drivers</h1>
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
            </Paper>
        </div>
    );
};

export default LandingPage;
