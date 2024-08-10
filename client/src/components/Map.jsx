import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  backgroundColor: color,
  padding: "10px 36px",
  fontSize: "15px"
}));



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
      >
        <Button variant='contained' style={themes[0]}>Normal</Button>
        <Button variant='contained' style={themes[1]}>Low</Button>
        <Button variant='contained' style={themes[2]}>Medium</Button>
        <Button variant='contained' style={themes[3]}>High</Button>
        <Button variant='contained' style={themes[4]}>Extreme</Button>
      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP4935sgIDwKy6UFmDSchMGBv9zesXlvQ'
})(MapContainer);


