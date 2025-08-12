import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/DeleteOutline';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SimpleBottomNavigation({ value, onChange }) {
  return (
  <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 900 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={onChange}
      >
        <BottomNavigationAction label="定點清運" icon={<RestoreIcon />} />
        <BottomNavigationAction label="垃圾車" icon={<DirectionsBusIcon />} />
        <BottomNavigationAction label="積分" icon={<StarIcon />} />
        <BottomNavigationAction label="設定" icon={<SettingsIcon />} /> 
      </BottomNavigation>
    </Box>
  );
}
