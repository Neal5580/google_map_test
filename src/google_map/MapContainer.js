import React, { Component } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
const { compose, withProps, withStateHandlers } = require("recompose");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const demoFancyMapStyles = require("./demoFancyMapStyles.json");

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUnqta7qYv6RNmCvZ2SedEZc40_xpCE-w&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 37.778519, lng: -122.40564 }
    }),
    withStateHandlers(
        () => ({
            isOpen: false
        }),
        {
            onToggleOpen: ({ isOpen }) => () => ({
                isOpen: !isOpen
            })
        }
    ),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={13}
        defaultCenter={props.center}
        defaultOptions={{ styles: demoFancyMapStyles }}
    >
        <Marker
            position={{ lat: 37.778519, lng: -122.40564 }}
            onClick={props.onToggleOpen}
        >
            {props.isOpen && (
                <InfoBox
                    onCloseClick={props.onToggleOpen}
                    options={{ closeBoxURL: ``, enableEventPropagation: true }}
                >
                    <div
                        style={{
                            backgroundColor: `yellow`,
                            opacity: 0.75,
                            padding: `12px`
                        }}
                    >
                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            Hello, Kaohsiung!
                        </div>
                    </div>
                </InfoBox>
            )}
        </Marker>
    </GoogleMap>
));

class MapContainer extends Component {
    render() {
        return (
            <div>
                <MyMapComponent isMarkerShown />
            </div>
        );
    }
}

export default MapContainer;
