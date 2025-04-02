import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface ErrorDisplayProps {
  message?: string; 
  error?: Error | null; 
}
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  error,
}) => {
  const errorMessage = message || error?.message || 'An unexpected error occurred. Please try again.';

  return (
    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
      <AlertTitle>Error</AlertTitle>
      {errorMessage}
      
    </Alert>
  );
};

export default ErrorDisplay;