import React, {useState, useEffect, useContext} from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import TemporaryDrawer from './Drawer';
import axios from 'axios';
import { MarkerContext, LevelContext } from './Map';


const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);

const usePopupState = () => {
  const [anchor, setAnchor] = useState(null);
  
  const [poptext, setPoptext] = useContext(LevelContext);

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;
  const handleClick = (event, level) => {
    setAnchor(anchor ? null : event.currentTarget);
    setPoptext(`${level}`);
  };


const [markers, setMarkers] = useContext(MarkerContext)

const handleMarkers = (positions) => {
  setMarkers(positions);
};

  useEffect(() => {
    if (poptext !== ''){
        axios.get(`http://localhost:7000/marker/${poptext}`)
          .then(response => {
            console.log('markers are:', response.data);
            handleMarkers(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }
  }, [poptext]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
      setDrawerOpen(newOpen);
    };

  const Popup = () => {
    return (
      <BasePopup id={id} open={open} anchor={anchor} onClick={toggleDrawer(!drawerOpen)}>
        <TemporaryDrawer open={drawerOpen} level={poptext} />
        <PopupBody>{poptext}</PopupBody>
    </BasePopup>
    );
  };
  
  return {handleClick, Popup};
};

export default usePopupState;