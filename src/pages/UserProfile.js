import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const UserProfile = (props) => {
    const [userData, setUserData] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);
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
            console.log("Sending request...");
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URI}/api/user/info/`,
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
    }, [props, history, showEditForm]);

    function handleEditAccount() {
        setShowEditForm(true);
        // fill in default values for form
        setFormEmail(userData.email);
        setFormName(userData.name);
        setFormSurname(userData.surname);
    }

    function handleSubmitEdit() {
        async function submitEdits() {
            console.log("Sending request...");
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URI}/api/user/info/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.tokens?.access}`,
                    },
                    body: JSON.stringify({
                        email: formEmail,
                        name: formName,
                        surname: formSurname,
                    }),
                }
            );
            const myJson = await response.json();
            console.log("got response:", myJson);

            if (myJson.code === "token_not_valid") {
                console.log(
                    "UNEXPECTED ERROR: user should be logged in but app was denied access to API"
                );
            } else {
                console.log("Updated user, response:", myJson);
                // getUserData(); // refresh the displayed data
                setShowEditForm(false);
            }
        }

        submitEdits();
    }

    function handleDeleteAccount() {
        async function deleteUser() {
            console.log("Sending request...");
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URI}/api/user/info/`,
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{userData.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{userData.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Surname</TableCell>
                            <TableCell>{userData.surname}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Last Login</TableCell>
                            <TableCell>{userData.last_login}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date Joined</TableCell>
                            <TableCell>{userData.date_joined}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Subscriber?</TableCell>
                            <TableCell>
                                {userData.is_subscriber ? "Yes" : "No"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <Button
                    variant="outlined"
                    onClick={handleEditAccount}
                    style={{ margin: "1rem" }}
                >
                    Edit Info
                </Button>
                <Button
                    variant="text"
                    onClick={handleDeleteAccount}
                    style={{ margin: "1rem" }}
                >
                    Delete Account
                </Button>
            </div>

            {showEditForm ? (
                <Paper elevation={10} sx={{ padding: "1rem 2rem 2rem" }}>
                    <h2>Edit Info</h2>
                    <TextField
                        type="email"
                        label="Email address"
                        helperText="This will change the email you use to sign in."
                        value={formEmail}
                        onChange={(e) => {
                            setFormEmail(e.target.value);
                        }}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        type="text"
                        label="Name"
                        value={formName}
                        onChange={(e) => {
                            setFormName(e.target.value);
                        }}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        type="email"
                        label="Surname"
                        value={formSurname}
                        onChange={(e) => {
                            setFormSurname(e.target.value);
                        }}
                        margin="normal"
                    />
                    <br />
                    <Button variant="contained" onClick={handleSubmitEdit}>
                        Save Changes
                    </Button>
                </Paper>
            ) : (
                <></>
            )}
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
