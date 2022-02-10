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
        </Grid>
    );
};

export default Footer;
