import * as React from 'react';

import { Button, Container } from '@mui/material';
import usePopupState from './Popup';



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
    
    
    

    return (
    <Container maxWidth="md" style={{ position: 'absolute', bottom: 75, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10 }}>
      <Button variant='contained' style={themes[0]} onClick={(event) => handleClick(event, 'Normal')}>Normal</Button>
      <Button variant='contained' style={themes[1]} onClick={(event) => handleClick(event, 'Low')}>Low</Button>
      <Button variant='contained' style={themes[2]} onClick={(event) => handleClick(event, 'Medium')}>Medium</Button>
      <Button variant='contained' style={themes[3]} onClick={(event) => handleClick(event, 'High')}>High</Button>
      <Button variant='contained' style={themes[4]} onClick={(event) => handleClick(event, 'Extreme')}>Extreme</Button>

        <Popup/>
    </Container>
  );
};

export default LevelButtons;