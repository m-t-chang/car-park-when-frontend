import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { teal, red } from "@mui/material/colors";

import { ThemeProvider } from "@emotion/react";

// my pages, components, etc.
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import StaticDataContext from "./contexts/StaticDataContext";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: red,
    },
});

function App() {
    useEffect(() => {
        console.log("a use effect");
    }, []);

    return (
        // <StaticDataContext.Provider value={staticData}>
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route path="/signup/">
                        <SignUp />
                    </Route>
                    {/* <Route path="/signin/"> */}
                    {/* <SignIn /> */}
                    {/* </Route> */}
                    <Route path="/dashboard/">
                        <Dashboard />
                    </Route>
                    {/* <Route path="/profile/"> */}
                    {/* <Profile /> */}
                    {/* </Route> */}
                </Switch>
            </Container>
            <Footer />
        </ThemeProvider>
        // </StaticDataContext.Provider>
    );
}

export default App;
