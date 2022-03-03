import React from "react";
import { Typography, Grid, Link } from "@mui/material";

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
                <Link
                    href="https://www.vecteezy.com/free-vector/parking-icon"
                    color="#D3D3D3"
                >
                    Parking Icon Vectors by Vecteezy
                </Link>
            </Grid>
            <Grid item></Grid>
        </Grid>
    );
};

export default Footer;
