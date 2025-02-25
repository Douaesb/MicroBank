import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { Client } from '../types/client';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [clientCount, setClientCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientResponse = await axiosInstance.get<Client[]>('/customers');
        setClientCount(clientResponse.data.length);
        setError(null);
      } catch (err: any) {
        setError('Erreur lors du chargement des données: ' + (err.response?.data?.message || err.message));
        setClientCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1a73e8', 
            textAlign: 'center',
            mb: 6,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          Tableau de Bord Bancaire 🏦
        </Typography>
      </motion.div>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {error}
        </Alert>
      )}

      <Card
        sx={{
          maxWidth: 600,
          mx: 'auto',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          backgroundColor: '#ffffff',
          '&:hover': { boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)' },
          mb: 6,
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
            Total Clients
          </Typography>
          <Typography variant="h3" sx={{ color: '#1a73e8', fontWeight: 600 }}>
            {clientCount}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/clients"
            sx={{
              minWidth: 200,
              py: 1.5,
              borderRadius: 8,
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1557b0' },
              boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
            }}
          >
            Gérer les Clients
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/accounts"
            sx={{
              minWidth: 200,
              py: 1.5,
              borderRadius: 8,
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1557b0' },
              boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
            }}
          >
            Gérer les Comptes
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Dashboard;