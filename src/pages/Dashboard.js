import React, { useEffect, useState } from "react";

const Dashboard = (props) => {
    const [authStatus, setAuthStatus] = useState("initial_state");
    const [data, setData] = useState({});

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
                setAuthStatus("sign_in_failed");
            } else {
                setAuthStatus("signed_in");
                setData(myJson);
            }
        }

        getData();

        console.log("a use effect");
    }, [props.tokens]);

    return (
        <div>
            Data Dashboard... {JSON.stringify(props.tokens)}
            <h2>{authStatus}</h2>
            {JSON.stringify(data[0])}
            <ul>
                <li>{data[0].development}</li>
                <li>{data[0].location_lat}</li>
                <li>{data[0].location_lon}</li>
            </ul>
        </div>
    );
};

export default Dashboard;
