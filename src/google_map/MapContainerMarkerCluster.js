import React, { Component } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
const { compose, withProps, withHandlers } = require("recompose");
const demoFancyMapStyles = require("./demoFancyMapStyles.json");
const {
    MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUnqta7qYv6RNmCvZ2SedEZc40_xpCE-w&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withHandlers({
        onMarkerClustererClick: () => markerClusterer => {
            const clickedMarkers = markerClusterer.getMarkers();
            console.log(
                `Current clicked markers length: ${clickedMarkers.length}`
            );
            console.log(clickedMarkers);
        }
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        zoom={3}
        onZoomChanged={() => {
            console.log("on zoom");
        }}
        defaultCenter={props.center}
        defaultOptions={{ styles: demoFancyMapStyles }}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    key={marker.photo_id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
));

class MapContainer extends Component {
    componentWillMount() {
        this.setState({ markers: [] });
    }

    componentDidMount() {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/farrrr/dfda7dd7fccfec5474d3`,
            `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
        ].join("");

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.photos });
            });
    }

    render() {
        return (
            <div>
                <MyMapComponent markers={this.state.markers} />
            </div>
        );
    }
}

export default MapContainer;
