import * as React from 'react';

import { Button, Container } from '@mui/material';
import usePopupState from './Popup';


import axios from 'axios';

const themeColors = [
    "#04dc04", // Normal (Green)
    "#fcfc04", // Low (Yellow)
    "#ffa500", // Medium (Orange)
    "#fc3c04", // High (Red)
    "#e404fc"  // Extreme (Purple)
  ];

  // Update the theme object with the new colors
  const themes = themeColors.map((color, index) => ({
    borderRadius: 100,
    color: "black",
    backgroundColor: color,
    padding: "10px 36px",
    fontSize: "15px"
}));


const LevelButtons = () => {

    const { handleClick,  Popup } = usePopupState(); // Use the custom hook



  // ... (rest of the code)
    const handlePopClick = (level) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:7000/${level}`)
              .then(response => {
                
                console.log(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
      };
    
    

    return (
    <Container maxWidth="md" style={{ position: 'absolute', bottom: 75, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10 }}>

        <Button type="button" variant='contained' style={themes[0]} onClick={(event) => handleClick(event, 'normal')}>Normal</Button>
        <Button type="button" variant='contained' style={themes[1]} onClick={(event) => handleClick(event, 'low')}>Low</Button>
        <Button type="button" variant='contained' style={themes[2]} onClick={(event) => handleClick(event, 'medium')}>Medium</Button>
        <Button type="button" variant='contained' style={themes[3]} onClick={(event) => handleClick(event, 'high')}>High</Button>
        <Button type="button" variant='contained' style={themes[4]} onClick={(event) => handleClick(event, 'extreme')}>Extreme</Button>

        <Popup>
            asdasdfasdf
        </Popup>
    </Container>
  );
};

export default LevelButtons;