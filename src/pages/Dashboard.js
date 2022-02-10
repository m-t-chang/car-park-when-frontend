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
import { Line, Bar } from "react-chartjs-2";

import CarparkMap from "../components/CarparkMap";

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
    const [dataCarparkDetail, setDataCarparkDetail] = useState({});
    const [chartData, setChartData] = useState(false);
    const [carparkList, setCarparkList] = useState("");
    const [barChartData, setBarChartData] = useState(false);
    const [locationData, setLocationData] = useState([1.3521, 103.8198]); // this is [lat,lon]

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Chart.js Bar Chart",
            },
        },
    };

    // callback to get user geolocation
    function getUserLocation() {
        console.log("Fetching user geolocation...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);
            },
            (error) => {
                console.log("Error when trying to get geolocation:", error);
            }
        );
    }

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
                console.log(
                    "UNEXPECTED ERROR: user should be logged in but app was denied access to API"
                );
            } else {
                setData(myJson);

                setCarparkList(
                    <>
                        {JSON.stringify(myJson[0])}
                        <ul>
                            {myJson.map((elem) => (
                                <li key={elem.id}>
                                    <button
                                        value={elem.id}
                                        onClick={(e) => {
                                            setCarparkSelection(e.target.value);
                                        }}
                                    >
                                        {elem.id}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                );
            }
        }

        if (props.signedInFlag) {
            getData();
        }
    }, [props]);

    useEffect(() => {
        async function getCarparkDetail() {
            const response = await fetch(
                `http://localhost:8000/api/carpark-detail/${carparkSelection}/`,
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
                setDataCarparkDetail(myJson);

                const labels = myJson.timestamp;
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "My First dataset",
                            backgroundColor: "rgb(255, 99, 132)",
                            borderColor: "rgb(255, 99, 132)",
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

    useEffect(() => {
        const labels = ["January", "February", "March", "April", "May", "June"];
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [0, 10, 5, 2, 20, 30, 45],
                },
            ],
        });

        setBarChartData({
            labels: [
                "12 AM",
                "1 AM",
                "2 AM",
                "3 AM",
                "4 AM",
                "5 AM",
                "6 AM",
                "7 AM",
                "8 AM",
                "9 AM",
                "10 AM",
                "11 AM",
                "12 PM",
                "1 PM",
                "2 PM",
                "3 PM",
                "4 PM",
                "5 PM",
                "6 PM",
                "7 PM",
                "8 PM",
                "9 PM",
                "10 PM",
                "11 PM",
            ],

            datasets: [
                {
                    label: "Dataset 1",
                    data: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24,
                    ],
                    backgroundColor: "rgba(0, 99, 132, 0.9)",
                },
            ],
        });
    }, []);

    return (
        <div>
            <h1>Data Dashboard</h1>
            {props.signedInFlag ? (
                <>
                    <button onClick={getUserLocation}>Locate Me</button>
                    <CarparkMap
                        userLocation={locationData}
                        carparkData={data}
                        handleMarkerClick={({ e, a, payload }) => {
                            setCarparkSelection(payload.id);
                        }}
                    />
                    <h3>{carparkSelection}</h3>
                    {chartData && <Line data={chartData} />}{" "}
                </>
            ) : (
                <div>
                    Please <Link to="/signin">sign in</Link> to view data
                </div>
            )}
            {barChartData ? (
                <Bar options={barChartOptions} data={barChartData} />
            ) : (
                ""
            )}
        </div>
    );
};

export default Dashboard;
