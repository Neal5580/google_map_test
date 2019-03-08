import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    OverlayView
} from 'react-google-maps';
import { compose, withProps, withStateHandlers } from 'recompose';
const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -height - 30
});
const publicationData = require('./publicationData.json');
const demoFancyMapStyles = require('./demoFancyMapStyles.json');
const marker_icon = require('./marker_icon.png');
const MapWithControlledZoom = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAUnqta7qYv6RNmCvZ2SedEZc40_xpCE-w&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `50vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    /*
    withState("zoom", "onZoomChange", 4),
    withHandlers({
        incrementZoom: ({ onZoomChange }) => () =>
            onZoomChange(zoom => (zoom < 7 ? zoom + 1 : zoom)),
        decrementZoom: ({ onZoomChange }) => () =>
            onZoomChange(zoom => (zoom > 4 ? zoom - 1 : zoom))
    }),
    */
    withStateHandlers(
        () => ({
            zoom: 4
        }),
        {
            incrementZoom: ({ zoom }) => () => ({
                zoom: zoom < 8 ? zoom + 0.25 : zoom
            }),
            decrementZoom: ({ zoom }) => () => ({
                zoom: zoom > 4 ? zoom - 0.25 : zoom
            })
        }
    ),

    withScriptjs,
    withGoogleMap
)(props => {
    const onClick = props.onClick.bind(this, null);
    return (
        <div>
            <GoogleMap
                center={
                    props.selectedMarker
                        ? {
                              lat: props.selectedMarker.latitude,
                              lng: props.selectedMarker.longitude
                          }
                        : { lat: -20.2675, lng: 148.716944 }
                }
                zoom={props.zoom}
                ref={props.onMapMounted}
                onZoomChanged={props.onZoomChanged}
                defaultOptions={{
                    styles: demoFancyMapStyles,
                    gestureHandling: 'cooperative',
                    zoomControl: false
                }}
                onClick={onClick}
            >
                {props.markers.map((marker, index) => {
                    const onClick = props.onClick.bind(this, marker);
                    /*
                    return (
                        <Marker
                            key={index}
                            position={{
                                lat: marker.latitude,
                                lng: marker.longitude
                            }}
                            icon={marker_icon}
                            onClick={onClick}
                        >
                            {props.selectedMarker === marker && (
                                <InfoWindow style={{ position: "relative" }}>
                                    <div
                                        style={{
                                            textTransform: "uppercase",
                                            zIndex: "99",
                                            top: 0
                                        }}
                                    >
                                        <h1>{marker.desc}</h1>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    );
                    */

                    return (
                        <Marker
                            key={index}
                            position={{
                                lat: marker.latitude,
                                lng: marker.longitude
                            }}
                            icon={marker_icon}
                            onClick={onClick}
                            style={{ zIndex: '-1' }}
                        >
                            {props.selectedMarker === marker && (
                                <OverlayView
                                    position={{
                                        lat: marker.latitude,
                                        lng: marker.longitude
                                    }}
                                    mapPaneName={OverlayView.FLOAT_PANE}
                                    getPixelPositionOffset={
                                        getPixelPositionOffset
                                    }
                                    style={{
                                        position: 'absolute',
                                        zIndex: '99'
                                    }}
                                >
                                    <div
                                        className="overlayview_container fade-in-animation"
                                        style={{
                                            textTransform: 'uppercase',
                                            backgroundColor: '#272B67',
                                            textAlign: 'center',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <h1
                                            style={{
                                                color: 'white',
                                                marginLeft: '30px',
                                                marginRight: '30px'
                                            }}
                                        >
                                            {marker.desc}
                                        </h1>
                                    </div>
                                </OverlayView>
                            )}
                        </Marker>
                    );
                })}
            </GoogleMap>
            <div className="buttonContainer">
                <div>
                    <a id="zoomButtonIn">
                        <div
                            className="zoomButton"
                            style={{
                                backgroundColor: 'lightgreen'
                            }}
                            onClick={() => {
                                props.incrementZoom();
                            }}
                        >
                            +
                        </div>
                    </a>
                    <a id="zoomButtonOut">
                        <div
                            className="zoomButton"
                            style={{
                                backgroundColor: 'lightblue'
                            }}
                            onClick={() => {
                                props.decrementZoom();
                            }}
                        >
                            -
                        </div>
                    </a>
                </div>
            </div>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>Controlled zoom: {props.zoom}</h1>
            </div>
        </div>
    );
});

class MapContainerControlZoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publications: publicationData,
            selectedMarker: false
        };
    }

    componentDidMount() {
        /*
        fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
            .then(r => r.json())
            .then(data => {
                this.setState({ shelters: data.shelters });
            });
        */
    }

    handleClick = (marker, event) => {
        console.log({ marker });
        this.setState({ selectedMarker: marker });
    };

    render() {
        return (
            <div>
                <iframe
                    src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=f1unwn99d&bgcolor=EEEEEE&t=1532668421"
                    style={{ width: '100%', height: '30vw' }}
                    seamless="seamless"
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen="true"
                />
                <MapWithControlledZoom
                    markers={this.state.publications}
                    onClick={this.handleClick}
                    selectedMarker={this.state.selectedMarker}
                />
            </div>
        );
    }
}

export default MapContainerControlZoom;
