import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchAccountsByClientId } from '../api/accountApi';
import { fetchClients } from '../api/customerApi';
import { Account } from '../types/account';
import { Client } from '../types/client';

const AccountDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientResponse = await fetchClients();
        setClients(clientResponse);
        const clientId = Number(searchParams.get('clientId')) || 0;
        setSelectedClientId(clientId);
        const accountsResponse = await fetchAccountsByClientId(clientId);
        setAccounts(accountsResponse);
        setError(null);
      } catch (err: any) {
        setError('Erreur lors du chargement des comptes: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  const handleClientChange = async (event: SelectChangeEvent<number>) => {
    const clientId = Number(event.target.value);
    setSelectedClientId(clientId);
    try {
      setLoading(true);
      const accountsResponse = await fetchAccountsByClientId(clientId);
      setAccounts(accountsResponse);
      setError(null);
      setSuccess(`Comptes du client ID ${clientId} affichés !`);
    } catch (err: any) {
      setError('Erreur lors du chargement des comptes: ' + (err.response?.data?.message || err.message));
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
          Détails des Comptes Clients
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

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: '#1a73e8', fontWeight: 600, mb: 3 }}
        >
          Filtrer par Client
        </Typography>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Client</InputLabel>
          <Select
            value={selectedClientId}
            onChange={handleClientChange}
            sx={{ borderRadius: 8 }}
          >
            <MenuItem value={0} sx={{ color: '#757575', background: '#f8f9fa' }}>
              Veuillez choisir un client 
            </MenuItem>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id} sx={{ background: '#f8f9fa' }}>
                {client.name} (ID: {client.id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

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
          Liste des Comptes
        </Typography>
        <List>
          {accounts.length === 0 ? (
            <Typography sx={{ color: '#757575' }}>Aucun compte trouvé.</Typography>
          ) : (
            accounts.map((account) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem
                  sx={{
                    mb: 2,
                    borderRadius: 1,
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ color: '#1a73e8', fontWeight: 500 }}>
                        {`Compte ${account.type}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">Solde: {account.balance}€</Typography>
                        <Typography variant="body2">Client ID: {account.clientId}</Typography>
                        <Typography variant="body2">ID Compte: {account.id}</Typography>
                      </>
                    }
                  />
                </ListItem>
              </motion.div>
            ))
          )}
        </List>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/accounts')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 8,
            backgroundColor: '#1a73e8',
            '&:hover': { backgroundColor: '#1557b0' },
            boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
          }}
        >
          Retour à la Gestion
        </Button>
      </Box>
    </Container>
  );
};

export default AccountDetails;