import React, { Component } from "react";
import "./App.css";
/*
Using google-maps-react 
*/
//import Container from "./map/Container";

/*
Using google-maps-react 
*/
//import MapContainer from "./google_map/MapContainer";
//import MapContainerMarkerCluster from "./google_map/MapContainerMarkerCluster";
import MapContainerControlZoom from "./google_map/MapContainerControlZoom";
//import MapContainerOverlayView from "./google_map/MapContainerOverlayView";

class App extends Component {
    render() {
        return <MapContainerControlZoom />;
    }
}

export default App;
