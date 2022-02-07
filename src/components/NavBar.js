import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import LocationDataContext from "../contexts/LocationDataContext";

export default function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const locationData = useContext(LocationDataContext);
    const history = useHistory();

    const navMenu = (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
        >
            <List>
                <ListItem>
                    <Typography variant="h6">Car Park When</Typography>
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        history.push("/dashboard");
                    }}
                >
                    <ListItemIcon>
                        <EqualizerIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Dashboard"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Spam"} />
                </ListItem>
            </List>
            Github Link
            <br />
            Location: {JSON.stringify(locationData)}
        </Box>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Car Park When
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor={"right"}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                {navMenu}
            </Drawer>
        </>
    );
}
