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

import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

const CarparkHourlyAverage = (props) => {
    const [carparkHourlyAvgData, setCarparkHourlyAvgData] = useState([]);
    const [chartDataObj, setChartDataObj] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const weekdayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // fake data
    // useEffect(() => {
    //     setChartDataObj({
    //         labels: [
    //             "12 AM",
    //             "1 AM",
    //             "2 AM",
    //             "3 AM",
    //             "4 AM",
    //             "5 AM",
    //             "6 AM",
    //             "7 AM",
    //             "8 AM",
    //             "9 AM",
    //             "10 AM",
    //             "11 AM",
    //             "12 PM",
    //             "1 PM",
    //             "2 PM",
    //             "3 PM",
    //             "4 PM",
    //             "5 PM",
    //             "6 PM",
    //             "7 PM",
    //             "8 PM",
    //             "9 PM",
    //             "10 PM",
    //             "11 PM",
    //         ],

    //         datasets: [
    //             {
    //                 label: "Dataset 1",
    //                 data: carparkHourlyAvgData[0],
    //                 backgroundColor: "rgba(0, 99, 132, 0.9)",
    //             },
    //         ],
    //     });
    // }, [carparkHourlyAvgData]);

    function makeChartDataObjWith(arrayOf24Hours, chartLabel) {
        return {
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
                    data: arrayOf24Hours,
                    backgroundColor: "rgba(0, 99, 132, 0.9)",
                },
            ],
        };
    }

    useEffect(() => {
        async function getCarparkHourlyAvgData() {
            const response = await fetch(
                `http://localhost:8000/api/carpark-hourly-avg/${props.carparkSelection}/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.tokens?.access}`,
                    },
                }
            );
            const myJson = await response.json();
            console.log("got response for hourly average:", myJson);

            if (myJson.code === "token_not_valid") {
                // setAuthStatus("sign_in_failed");
                console.log(
                    "UNEXPECTED ERROR: user should be logged in but app was denied access to API"
                );
            } else {
                // transform the data
                const availableLotsArray = [[], [], [], [], [], [], []];
                myJson.data.forEach((elem) => {
                    availableLotsArray[elem.weekday - 1][elem.hour] =
                        elem.available_lots__avg;
                });
                setCarparkHourlyAvgData(availableLotsArray);
                setDataLoaded(true);
            }
        }

        if (props.signedInFlag && props.carparkSelection) {
            getCarparkHourlyAvgData();
        }
    }, [props.signedInFlag, props.carparkSelection]);

    function makeChartOptionsObjWith(titleText) {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: titleText,
                    font: { size: 20 },
                },
            },
        };
    }

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
        },
    ];
    function Item(props) {
        return (
            <Paper>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>

                <Button className="CheckButton">Check it out!</Button>
            </Paper>
        );
    }

    return (
        <>
            {dataLoaded ? (
                <Carousel
                    autoPlay={false}
                    animation="slide"
                    navButtonsAlwaysVisible={true}
                >
                    {carparkHourlyAvgData.map((array, i) => (
                        // <Item key={i} item={item} />
                        <Paper sx={{ padding: "0 5rem" }}>
                            <Bar
                                key={i}
                                options={makeChartOptionsObjWith(
                                    weekdayNames[i]
                                )}
                                data={makeChartDataObjWith(array)}
                            />
                        </Paper>
                    ))}
                </Carousel>
            ) : (
                ""
            )}
        </>
    );
};

export default CarparkHourlyAverage;
