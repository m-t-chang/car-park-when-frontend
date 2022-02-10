import React, { useEffect, useState } from "react";

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

const CarparkHourlyAverage = (props) => {
    const [data, setData] = useState(false);

    // fake data
    useEffect(() => {
        setData({
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

    useEffect(() => {
        async function getCarparkHourlyAvgData() {
            const response = await fetch(
                `http://localhost:8000/api/carpark-detail/${props.carparkSelection}/`,
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
                setData(myJson);
            }
        }

        if (props.signedInFlag && props.carparkSelection) {
            getCarparkHourlyAvgData();
        }
    }, [props]);

    const options = {
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

    return <>{data ? <Bar options={options} data={data} /> : ""}</>;
};

export default CarparkHourlyAverage;
