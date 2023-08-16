import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    BarElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import CarparkMap from "../components/CarparkMap";
import CarparkHourlyAverage from "../components/CarparkHourlyAverage";

ChartJS.register(
    LineElement,
    PointElement,
    BarElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip
);

const Dashboard = (props) => {
    const [data, setData] = useState(null);
    const [carparkSelection, setCarparkSelection] = useState(null);
    const [chartData, setChartData] = useState(false);

    useEffect(() => {
        async function getData() {
            console.log("Sending request...");
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URI}/api/carpark-list/`,
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
                setData(myJson);
            }
        }

        if (props.signedInFlag) {
            getData();
        }
    }, [props]);

    useEffect(() => {
        async function getCarparkDetail() {
            console.log("Sending request...");
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URI}/api/carpark-detail/${carparkSelection?.id}/`,
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
                const labels = myJson.timestamp;
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Available Lots",
                            backgroundColor: "cadetblue",
                            borderColor: "cadetblue",
                            data: myJson.available_lots,
                        },
                    ],
                });
            }
        }

        if (props.signedInFlag && carparkSelection) {
            getCarparkDetail();
        }
    }, [props, carparkSelection]);

    return (
        <div>
            <h1>Data Dashboard</h1>
            {!props.signedInFlag && (
                <div>
                    Please <Link to="/signin">sign in</Link> to unlock more
                    features.
                </div>
            )}
            <>
                <CarparkMap
                    carparkData={data}
                    handleMarkerClick={({ e, a, payload }) => {
                        setCarparkSelection(payload);
                    }}
                    carparkSelection={carparkSelection}
                />
                {carparkSelection ? (
                    <>
                        <h3 style={{ color: "darkblue" }}>
                            {carparkSelection?.development}
                            {/* {carparkSelection?.lot_type} NOTE THAT THE APP DOESNT ACCOUNT FOR VEHICLE TYPE*/}
                        </h3>
                        <h4>Average carpark availability</h4>
                        <CarparkHourlyAverage
                            signedInFlag={props.signedInFlag}
                            tokens={props.tokens}
                            carparkSelection={carparkSelection}
                        />
                        <h4>Detailed availability</h4>
                        {chartData && <Line data={chartData} />}{" "}
                    </>
                ) : (
                    <h4>Select a carpark to view more data</h4>
                )}
            </>
        </div>
    );
};

export default Dashboard;
