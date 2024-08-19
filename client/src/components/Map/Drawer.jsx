import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';


const TemporaryDrawer = ({ open, onToggleDrawer, level }) => {
  const [drawerFetch, setDrawerFetch] = useState(false);
  const toggleDrawer = (newOpen) => () => {
      setDrawerFetch(newOpen);
      
  };


  const [levellist, setLevellist] = useState('');
  const handleList= (levels) => {
    setLevellist(levels);
  }



  useEffect(() => { 
    console.log("drawer open is:", open);
    if (open) {
      axios.get(`http://localhost:7000/${level}`)
        .then(response => {
          handleList(response.data);
        })
  
        .catch(error => {
          console.error(error);
        });
    }
  }, [open]);


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
      {[levellist].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
 
  return (
    <div>
      <Drawer open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;