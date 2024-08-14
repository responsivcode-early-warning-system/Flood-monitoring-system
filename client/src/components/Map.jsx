import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { Button, Container } from '@mui/material';

const themeColors = [
  "#00ff00", // Normal (Green)
  "#ffff00", // Low (Yellow)
  "#ffa500", // Medium (Red)
  "#ff0000", // High (Purple)
  "#800080"  // Extreme (Blue)
];

// Update the theme object with the new colors
const themes = themeColors.map((color, index) => ({
  borderRadius: 100,
  color:"black",
  backgroundColor: color,
  padding: "10px 36px",
  fontSize: "15px"
}));

const mapStyles = {
  width: '95%',
  height: '80%',  
  padding: 20, 
  margin: '20px auto'
};

const initposition = {    
  lat:10.310530313219541, 
  lng:123.89366616608562
}



export class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={initposition}
        >   
        <Marker position={initposition} >
        </Marker>

        <Container maxWidth="md" style={{ position: 'absolute', bottom: 75, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10}}>
            <Button variant='contained' style={themes[0]} >Normal</Button>
            <Button variant='contained' style={themes[1]} >Low</Button>
            <Button variant='contained' style={themes[2]} >Medium</Button>
            <Button variant='contained' style={themes[3]} >High</Button>
            <Button variant='contained' style={themes[4]} >Extreme</Button>
        </Container>

        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP4935sgIDwKy6UFmDSchMGBv9zesXlvQ'
})(MapContainer);


