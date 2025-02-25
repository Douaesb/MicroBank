import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static" 
      elevation={0} 
      sx={{
        backgroundColor: '#ffffff', 
        color: '#1a73e8', 
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', paddingX: 3, height: 64 }}> 
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              fontWeight: 700,
              color: '#1a73e8',
              mr: 2,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Banque Moderne
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f5f5f5', 
                borderRadius: 1,
              },
              paddingX: 2,
              paddingY: 1,
            }}
          >
            Tableau de Bord
          </Button>
          <Button
            component={Link}
            to="/clients"
            color="inherit"
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f5f5f5', 
                borderRadius: 1,
              },
              paddingX: 2,
              paddingY: 1,
            }}
          >
            Clients
          </Button>
          <Button
            component={Link}
            to="/accounts"
            color="inherit"
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f5f5f5', 
                borderRadius: 1,
              },
              paddingX: 2,
              paddingY: 1,
            }}
          >
            Comptes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;