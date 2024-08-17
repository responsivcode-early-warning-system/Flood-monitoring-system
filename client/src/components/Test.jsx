import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TemporaryDrawer from './Drawer';

const ParentComponent = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <div>
      {/* Button to open the drawer */}
      <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
      <TemporaryDrawer open={drawerOpen} onToggleDrawer={toggleDrawer} />
      {/* Passing state and toggle function as props */}
    </div>
  );
};

export default ParentComponent;