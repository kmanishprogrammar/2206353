import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const LoadingSpinner: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 4, 
      minHeight: '200px', 
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;