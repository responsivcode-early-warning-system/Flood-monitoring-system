import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import CardList from './Card'

const TemporaryDrawer = ({ open, level }) => {
  const [levellist, setLevellist] = useState('');
  const handleList= (levels) => {
    setLevellist(levels);
  }
  
  useEffect(() => { 
    console.log("drawer open is:", open);
    if (open) {
      axios.get(`http://localhost:7000/${level}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [open]);
    
  return (
    <div>
      <Drawer open={open}>
        <CardList/>
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;