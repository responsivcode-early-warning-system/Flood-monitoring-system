import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HouseboatIcon from '@mui/icons-material/Houseboat';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function CardComponent() {
  return (
    <React.Fragment>
    <CardContent style={{color:"#00ccff"}}>
      <HouseboatIcon style={{width: '20%', height: '20%', color: "inherit"}}/>
      <Typography variant="h1" sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
        NORMAL
      </Typography>
      <Typography variant= "subtitle2" color="text.secondary">
        Arrabal River Station
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
  );
}