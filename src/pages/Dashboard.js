import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    // const [authStatus, setAuthStatus] = useState("initial_state");
    const [data, setData] = useState({});
    const [dashboard, setDashboard] = useState(
        <div>
            Please <Link to="/signin">sign in</Link> to view data
        </div>
    );

    useEffect(() => {
        async function getData() {
            const response = await fetch(
                `http://127.0.0.1:8000/api/carpark-list/`,
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
                // setAuthStatus("sign_in_failed");
                console.log(
                    "UNEXPECTED ERROR: user should be logged in but app was denied access to API"
                );
            } else {
                // setAuthStatus("signed_in");
                setData(myJson);

                setDashboard(
                    <>
                        {JSON.stringify(myJson[0])}
                        <ul>
                            <li>{myJson[0].development}</li>
                            <li>{myJson[0].location_lat}</li>
                            <li>{myJson[0].location_lon}</li>
                        </ul>
                    </>
                );
            }
        }

        if (props.signedInFlag) {
            getData();
        }

        console.log("a use effect");
    }, [props]);

    return (
        <div>
            Data Dashboard... {JSON.stringify(props.tokens)}
            {/* <h2>{authStatus}</h2> */}
            {dashboard}
        </div>
    );
};

export default Dashboard;
