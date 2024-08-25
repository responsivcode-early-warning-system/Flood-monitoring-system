import React, { Component, useContext,useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import LevelButtons  from './levelButtons';
import normalIcon from './icons/gps.png';
import lowIcon from './icons/gps(1).png';
import mediumIcon from './icons/gps(2).png';
import highIcon from './icons/gps(3).png';
import extremeIcon from './icons/gps(4).png';

export const MarkerContext = React.createContext();
export const LevelContext = React.createContext();

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

  const MapMarker= (items, google)=> {
  if (items.length > 0) {
    return (
        <div>
        {items.map((item, index) => (
          <Marker
            key = {index}
            position={{ lat: item.lat, lng: item.lng }}
            icon={{
              url: markerIcons[index],
              scaledSize: new window.google.maps.Size(30, 30)
            }}
            google={props.google}
          />
            ))}
        </div>
    )
  } else {
    return null;
  }
}

export const MapContainer = (props) => {
    const [markers, setMarkers] = useState([]);
  const [poptext, setPoptext] = useState('');


    useEffect(() => {
      console.log('marker has changed:', markers);
    }, [markers]);
  
    return (
      <Map 
      google={props.google}
      zoom={14}
        initialCenter={initposition}
        >   
          <MarkerContext.Provider value= {[markers, setMarkers]}>

          <LevelButtons />
          </MarkerContext.Provider>
          {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: markerIcons[index],
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          />
        ))}
        </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP4935sgIDwKy6UFmDSchMGBv9zesXlvQ'
})(MapContainer);