import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import Divider from '@mui/material/Divider';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cards=(
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


export default function CardList() {
  return(
    <Box sx={{ width: 300 }} role="presentation">
        <Box sx={{ml:'30px', display:'flex', marginTopn: 2,  border: '2px solid grey', borderRadius: 4, borderColor: '#ff4d4d' }} height={250} width={200} my={4} display="flex" alignItems="center" gap={4} p={2}>
        <Box sx={{ minWidth: 275 }} >
            {cards}
            <Divider />
        </Box>
    </Box>
    </Box>
  )
}