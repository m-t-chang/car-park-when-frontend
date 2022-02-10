import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";

import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const CarparkHourlyAverage = (props) => {
    const [carparkHourlyAvgData, setCarparkHourlyAvgData] = useState([]);
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
                `${process.env.REACT_APP_BACKEND_URI}/api/carpark-hourly-avg/${props.carparkSelection}/`,
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
    }, [props.signedInFlag, props.carparkSelection, props.tokens?.access]);

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

    return (
        <>
            {dataLoaded ? (
                <Carousel
                    autoPlay={false}
                    animation="slide"
                    navButtonsAlwaysVisible={true}
                >
                    {carparkHourlyAvgData.map((array, i) => (
                        <Paper sx={{ padding: "0 5rem" }} key={i}>
                            <Bar
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
