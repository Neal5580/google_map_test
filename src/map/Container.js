import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class Container extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  markerClick = (props, marker, e) => {
    console.log("Mouse Click");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  mouseOver = (props, marker, e) => {
    console.log("Mouse Over");
  };

  render() {
    const style = {
      width: "100vw",
      height: "100vh"
    };
    return (
      <div style={style}>
        <Map google={this.props.google} onClick={this.onMapClicked}>
          <Marker
            onClick={this.markerClick}
            onMouseover={this.mouseOver}
            title={"The marker`s title will appear as a tooltip."}
            name={"Place A"}
            position={{ lat: 37.778519, lng: -122.40564 }}
          />
          <Marker
            onClick={this.markerClick}
            onMouseover={this.mouseOver}
            title={"The marker`s title will appear as a tooltip."}
            name={"Place B"}
            position={{ lat: 37.759703, lng: -122.428093 }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAUnqta7qYv6RNmCvZ2SedEZc40_xpCE-w"
})(Container);
