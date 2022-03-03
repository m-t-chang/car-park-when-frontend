import React from "react";
import { Typography, Grid } from "@mui/material";

const Footer = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            sx={{
                padding: 5,
                color: "lightgrey",
            }}
        >
            <Grid item>
                <Typography>Copyright © 2022 Michael T. Chang</Typography>
            </Grid>
            <Grid item>
                <a href="https://www.vecteezy.com/free-vector/parking-icon">
                    Parking Icon Vectors by Vecteezy
                </a>
            </Grid>
        </Grid>
    );
};

export default Footer;
