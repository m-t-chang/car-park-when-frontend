import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const UserProfile = (props) => {
    const [userData, setUserData] = useState({});
    const [formEmail, setFormEmail] = useState("");
    const [formName, setFormName] = useState("");
    const [formSurname, setFormSurname] = useState("");
    const history = useHistory();

    useEffect(() => {
        // redirect to sign in, if not signed in
        if (!props.signedInFlag) {
            history.push("/signin");
        }

        // call the API to pull user data
        async function getUserData() {
            const response = await fetch(
                `http://127.0.0.1:8000/api/user/info/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.tokens?.access}`,
                    },
                }
            );
            const myJson = await response.json();
            console.log("got response:", myJson);

            if (myJson.code === "token_not_valid") {
                console.log(
                    "UNEXPECTED ERROR: user should be logged in but app was denied access to API"
                );
            } else {
                setUserData(myJson);
            }
        }
        getUserData();
    }, [props, history]);

    function handleEditAccount() {
        // fill in default values for form
        setFormEmail(userData.email);
        setFormName(userData.name);
        setFormSurname(userData.surname);
    }

    function handleSubmitEdit() {
        const requestBody = {
            email: formEmail,
            name: formName,
            surname: formSurname,
        };
        console.log(requestBody);
    }

    function handleDeleteAccount() {
        async function deleteUser() {
            const response = await fetch(
                `http://127.0.0.1:8000/api/user/info/`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.tokens?.access}`,
                    },
                }
            );
            const myJson = await response.json();
            console.log("got response:", myJson);

            if (myJson.code === "token_not_valid") {
                console.log(
                    "UNEXPECTED ERROR: user should be logged in but app was denied access to API"
                );
            } else {
                console.log("Delete user response:", myJson);
                props.handleLogout();
                history.push("/");
            }
        }

        if (
            window.confirm(
                "We're sorry to see you go! Are you sure you want to delete your account with us? This action cannot be undone."
            )
        ) {
            deleteUser();
        }
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.name}</p>
            <p>Surname: {userData.surname}</p>
            <p>Last Login: {userData.last_login}</p>
            <p>Date Joined: {userData.date_joined}</p>
            <p>Subscriber? {userData.is_subscriber ? "Yes" : "No"}</p>

            <div>
                <Button variant="outlined" onClick={handleEditAccount}>
                    Edit Info
                </Button>
                <Button variant="text" onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </div>

            <Box>
                <TextField
                    type="email"
                    label="Email address"
                    helperText="This will change the email you use to sign in."
                    value={formEmail}
                    onChange={(e) => {
                        setFormEmail(e.target.value);
                    }}
                />
                <TextField
                    type="text"
                    label="Name"
                    value={formName}
                    onChange={(e) => {
                        setFormName(e.target.value);
                    }}
                />
                <TextField
                    type="email"
                    label="Surname"
                    value={formSurname}
                    onChange={(e) => {
                        setFormSurname(e.target.value);
                    }}
                />
                <Button variant="contained" onClick={handleSubmitEdit}>
                    Save Changes
                </Button>
            </Box>
        </div>
    );
};

export default UserProfile;

// date_joined: "2022-02-08T04:10:03.743111Z"
// email: "michaeltgchang@gmail.com"
// id: 1
// is_active: true
// is_admin: true
// is_staff: true
// is_subscriber: false
// is_superuser: true
// last_login: "2022-02-08T04:10:17.188094Z"
// name: ""
// password: "pbkdf2_sha256$320000$6l44ckV9hELhcVlN21HjxS$0tWUZMQm37L/iEuazvekVuPmSm3UVfH/XoxOqTUKmIE="
// surname: ""
