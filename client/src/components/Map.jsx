import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '80%',
  height: '70%',
  padding: 20, 
  margin: '20px auto'
};


export class MapContainer extends Component {


  render() {
    return (
      <Map 
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP4935sgIDwKy6UFmDSchMGBv9zesXlvQ'
})(MapContainer);


