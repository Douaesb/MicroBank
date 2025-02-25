import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1a73e8' }, 
    secondary: { main: '#757575' },
    success: { main: '#4caf50' }, 
    error: { main: '#d32f2f' }, 
    background: { default: '#f9f9f9', paper: '#ffffff' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
});

export default theme;