import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
function Home() {

    return (
          <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to='/'>
                  Flood Monitoring System
                </Link>
              </Typography>
              <Link to='/map'>
                <Button color='inherit' style={{color:'white'}}>Map</Button>
              </Link>
              <Link to='/signup'>
                <Button color='inherit' style={{color:'white'}}>Signup</Button>
              </Link>
              <Link to='/test'>
                <Button color='inherit' style={{color:'white'}}>Test</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
    );
  }

  export default Home;