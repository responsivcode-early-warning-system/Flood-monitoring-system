import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import LevelButtons  from './levelButtons';
import normalIcon from './icons/gps.png';
import lowIcon from './icons/gps(1).png';
import mediumIcon from './icons/gps(2).png';
import highIcon from './icons/gps(3).png';
import extremeIcon from './icons/gps(4).png';

const markerIcons = [normalIcon, lowIcon, mediumIcon, highIcon, extremeIcon];

const mapStyles = {
  width: '95%',
  height: '80%',  
  margin: '20px auto'
};

const initposition = {    
  lat:10.310530313219541, 
  lng:123.89366616608562
}

const initPositions = [
  { lat: 10.310530313219541, lng: 123.89366616608562 },
  { lat: 10.311023456789012, lng: 123.89415930965509 },
  { lat: 10.311516600358483, lng: 123.89465245322456 },
  // Add more entries as needed
  { lat: 10.312009743927954, lng: 123.89514559679506 }, // New position nearby
  { lat: 10.312502887497425, lng: 123.89563874036453 }, // Another new position nearby
];

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  render() {
    return (
      <Map 
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={initposition}
        >   
        {initPositions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            icon={{
              url: markerIcons[index],
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          />
        ))}
        <LevelButtons />
        
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP4935sgIDwKy6UFmDSchMGBv9zesXlvQ'
})(MapContainer);