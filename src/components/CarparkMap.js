import React, { useState } from "react";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import Button from "@mui/material/Button";

const singaporeLocation = [1.3521, 103.8198];

const CarparkMap = (props) => {
    const [center, setCenter] = useState(singaporeLocation);
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayAnchor, setOverlayAnchor] = useState(singaporeLocation);
    const [overlayText, setOverlayText] = useState("");
    const [zoom, setZoom] = useState(11);

    // callback to get user geolocation
    function centerMapOnUser() {
        console.log("Fetching user geolocation...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);
                setZoom(16);
            },
            (error) => {
                console.log("Error when trying to get geolocation:", error);
            }
        );
    }

    return (
        <div style={{ position: "static" }}>
            <Button
                sx={{ position: "absolute", right: "1.5rem", top: "7rem" }}
                variant="outlined"
                onClick={centerMapOnUser}
            >
                Move Map to My Location
            </Button>

            <Map
                height={400}
                center={center}
                zoom={zoom}
                minZoom={11}
                maxZoom={16}
                animate={false}
                onBoundsChanged={({ center, zoom }) => {
                    setCenter(center);
                    setZoom(zoom);
                }}
            >
                {props.carparkData &&
                    props.carparkData.map((elem) => (
                        <Marker
                            key={elem.id}
                            width={30}
                            anchor={[elem.location_lat, elem.location_lon]}
                            payload={elem}
                            color={
                                props.carparkSelection?.id === elem.id
                                    ? "darkblue"
                                    : "cadetblue"
                            }
                            onMouseOver={({ anchor, payload }) => {
                                console.log(
                                    `${payload.development} | ${payload.id}`
                                );
                                setOverlayAnchor(anchor);
                                setOverlayText(payload.development);
                                setShowOverlay(true);
                            }}
                            onMouseOut={({ anchor, payload }) => {
                                setShowOverlay(false);
                            }}
                            onClick={props.handleMarkerClick}
                        />
                    ))}

                {showOverlay ? (
                    <Overlay anchor={overlayAnchor}>
                        <div
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "0.5rem",
                            }}
                        >
                            {overlayText}
                        </div>
                    </Overlay>
                ) : (
                    <></>
                )}
                <ZoomControl />
            </Map>
        </div>
    );
};

// agency: "LTA"
// area: "Marina"
// car_park_id: "1"
// development: "Suntec City"
// id: "1-C"
// location_lat: 1.29375
// location_lon: 103.85718
// lot_type: "C"

export default CarparkMap;
