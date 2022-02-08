import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

const CarparkMap = (props) => {
    const [center, setCenter] = useState(props.userLocation);
    const [zoom, setZoom] = useState(11);

    useEffect(() => {
        setCenter(props.userLocation);
    }, [props.userLocation]);

    return (
        <Map
            height={400}
            center={center}
            zoom={zoom}
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
                        onMouseOver={({ e, a, payload }) => {
                            console.log(
                                `${payload.development} | ${payload.id}`
                            );
                        }}
                        onClick={props.handleMarkerClick}
                    />
                ))}

            <ZoomControl />
        </Map>
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
