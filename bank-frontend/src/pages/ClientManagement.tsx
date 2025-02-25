import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addClient, getClientById } from '../api/customerApi';
import { Client } from '../types/client';
import ClientForm from '../components/ClientForm';

const ClientManagement: React.FC = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddClient = async (newClient: Omit<Client, 'id'>) => {
    try {
      setLoading(true);
      const addedClient = await addClient(newClient);
      setSuccess('Client ajouté avec succès !');
      setError(null);
      navigate('/client-details'); 
    } catch (err: any) {
      setError('Erreur lors de l’ajout du client: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetClientById = async () => {
    if (!clientId) {
      setError('Veuillez entrer un ID valide.');
      return;
    }
    try {
      setLoading(true);
      const client = await getClientById(Number(clientId));
      setSelectedClient(client);
      setError(null);
      setSuccess(`Client ID ${clientId} trouvé !`);
    } catch (err: any) {
      setError('Client non trouvé ou erreur lors de la recherche: ' + (err.response?.data?.message || err.message));
      setSelectedClient(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1a73e8', 
            textAlign: 'center',
            mb: 4,
          }}
        >
          Gestion des Clients
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
      {success && (
        <Alert severity="success" sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Add Client Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: '#1a73e8', fontWeight: 600, mb: 3 }}
            >
              Ajouter un Nouveau Client
            </Typography>
            <ClientForm onSubmit={handleAddClient} />
          </Paper>
        </Grid>

        {/* Search Client Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: '#1a73e8', fontWeight: 600, mb: 3 }}
            >
              Rechercher un Client
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TextField
                label="ID du Client"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                type="number"
                fullWidth
                variant="outlined"
                sx={{ mr: 2, borderRadius: 8 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetClientById}
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 8,
                  backgroundColor: '#1a73e8',
                  '&:hover': { backgroundColor: '#1557b0' },
                  boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
                }}
              >
                Rechercher
              </Button>
            </Box>
            {selectedClient && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    mt: 2,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: '#1a73e8', fontWeight: 500 }}>
                    Détails du Client:
                  </Typography>
                  <Typography variant="body1">
                    Nom: <strong>{selectedClient.name}</strong> - Email: <strong>{selectedClient.email}</strong>
                  </Typography>
                  <Typography variant="body2">
                    ID: {selectedClient.id}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/client-details?clientId=${selectedClient.id}`)}
                      sx={{
                        mt: 2,
                        borderRadius: 8,
                        backgroundColor: '#1a73e8',
                        '&:hover': { backgroundColor: '#1557b0' },
                        boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
                      }}
                    >
                      Voir Détails & Comptes
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/client-details')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 8,
            backgroundColor: '#1a73e8',
            '&:hover': { backgroundColor: '#1557b0' },
            boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
          }}
        >
          Voir Tous les Clients
        </Button>
      </Box>

      {/* Add subtle animation for alerts */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .MuiAlert-root {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </Container>
  );
};

export default ClientManagement;