import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar(props) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const history = useHistory();

    const signInOrOut = props.signedInFlag ? (
        <>
            <ListItem>
                <ListItemText primary={`Signed in as ${props.user.email}`} />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    history.push("/profile");
                }}
            >
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    props.handleLogout();
                    history.push("/signin");
                }}
            >
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Log Out"} />
            </ListItem>
        </>
    ) : (
        <>
            <ListItem
                button
                onClick={() => {
                    history.push("/signin");
                }}
            >
                <ListItemIcon>
                    <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Sign In"} />
            </ListItem>
        </>
    );

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

                {signInOrOut}
                <Divider />

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

                {/* <Divider />

                <ListItem>
                    <ListItemText>Github Link</ListItemText>
                </ListItem> */}
            </List>
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
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                Car Park When
                            </Link>
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
