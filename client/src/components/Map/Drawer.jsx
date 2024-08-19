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

  useEffect(() => {
    toggleDrawer(open)();
    if (drawerFetch) {
      const handlePopClick = () => {
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
      console.log(handlePopClick());
    }
    
  }, [open, toggleDrawer]);


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onToggleDrawer(false)}>
      <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
      <Drawer open={drawerFetch} onClose={onToggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;