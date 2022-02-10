import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";

const UserProfile = (props) => {
    const [userData, setUserData] = useState({});
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

    function handleDeleteAccount() {
        console.log("placeholder for delete account");
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
            <Button variant="outlined" onClick={handleDeleteAccount}>
                Delete Account
            </Button>
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
