import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { teal, red } from "@mui/material/colors";

import { ThemeProvider } from "@emotion/react";

// my pages, components, etc.
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: red,
    },
});

function App() {
    const [signedInFlag, setSignedInFlag] = useState(false);
    const [user, setUser] = useState({ email: "" });
    const [tokens, setTokens] = useState({
        access: "INITALSTATE",
        refresh: "INITIALSTATE",
    });

    useEffect(() => {}, []);

    return (
        // <AuthContext.Provider value={tokens}>
        <ThemeProvider theme={theme}>
            <NavBar signedInFlag={signedInFlag} user={user} />
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route path="/signup/">
                        <SignUp />
                    </Route>
                    <Route path="/signin/">
                        <SignIn
                            tokens={tokens}
                            setTokens={setTokens}
                            signedInFlag={signedInFlag}
                            setSignedInFlag={setSignedInFlag}
                            setUser={setUser}
                        />
                    </Route>
                    <Route path="/dashboard/">
                        <Dashboard
                            signedInFlag={signedInFlag}
                            tokens={tokens}
                        />
                    </Route>
                    <Route path="/profile/">
                        <UserProfile
                            signedInFlag={signedInFlag}
                            tokens={tokens}
                            user={user}
                        />
                    </Route>
                </Switch>
            </Container>
            <Footer />
        </ThemeProvider>
        // </AuthContext.Provider>
    );
}

export default App;
