import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAccountById, createAccount } from '../api/accountApi';
import { fetchClients } from '../api/customerApi';
import { Account } from '../types/account';
import { Client } from '../types/client';

type AccountType = 'COURANT' | 'EPARGNE';

const AccountManagement: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [newAccount, setNewAccount] = useState({
    balance: 0,
    type: '' as AccountType,
    clientId: 0,
  });
  const [accountId, setAccountId] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientResponse = await fetchClients();
        setClients(clientResponse);
        setError(null);
      } catch (err: any) {
        setError('Erreur lors du chargement des données: ' + (err.response?.data?.message || err.message));
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAccount.balance < 0 || !newAccount.type || !newAccount.clientId) {
      setError('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      setLoading(true);
      const response = await createAccount(newAccount);
      setAccounts([...accounts, response]);
      setNewAccount({ balance: 0, type: '' as AccountType, clientId: 0 });
      setSuccess('Compte créé avec succès !');
      setError(null);
      navigate('/account-details'); 
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(
        errorMessage.includes('Customer not found')
          ? `Client avec ID ${newAccount.clientId} non trouvé.`
          : errorMessage.includes('already has a')
          ? `Le client a déjà un compte ${newAccount.type}.`
          : 'Erreur lors de la création du compte: ' + errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetAccountById = async () => {
    if (!accountId) {
      setError('Veuillez entrer un ID valide.');
      return;
    }
    try {
      setLoading(true);
      const account = await getAccountById(Number(accountId));
      setSelectedAccount(account);
      setError(null);
      setSuccess(`Compte ID ${accountId} trouvé !`);
    } catch (err: any) {
      setError('Compte non trouvé ou erreur lors de la recherche: ' + (err.response?.data?.message || err.message));
      setSelectedAccount(null);
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
          Gestion des Comptes Bancaires
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
       
        <Grid item xs={12} md={6}>
       <Paper
  elevation={3}
  sx={{
    p: 4,
    borderRadius: 3,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: 500,
    mx: 'auto',
  }}
>
  <Typography
    variant="h5"
    gutterBottom
    sx={{ color: '#1a73e8', fontWeight: 600, mb: 3, textAlign: 'center' }}
  >
    Créer un Nouveau Compte
  </Typography>
  <form onSubmit={handleSubmit}>
    <FormControl fullWidth margin="normal">
      <TextField
        label="Solde Initial (€)"
        type="number"
        value={newAccount.balance === 0 ? '' : newAccount.balance}
        onChange={(e) => {
          const value = e.target.value ? Number(e.target.value) : 0;
          setNewAccount({ ...newAccount, balance: value });
        }}
        required
        variant="outlined"
        InputProps={{
          style: { borderRadius: 12 },
          inputProps: { min: 0 }, 
        }}
        error={submitted && newAccount.balance < 0}
        helperText={submitted && newAccount.balance < 0 ? 'Le solde ne peut pas être négatif' : ''}
      />
    </FormControl>

    {/* Type de Compte Dropdown */}
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{ borderRadius: 12 }}
      error={submitted && !newAccount.type}
    >
      <InputLabel>Type de Compte</InputLabel>
      <Select
        value={newAccount.type}
        onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value as AccountType })}
        required
        label="Type de Compte"
        sx={{ borderRadius: 12 }}
      >
        <MenuItem value="COURANT">Compte Courant</MenuItem>
        <MenuItem value="EPARGNE">Compte Épargne</MenuItem>
      </Select>
      {submitted && !newAccount.type && (
        <Typography color="error" sx={{ fontSize: '0.875rem', mt: 0.5 }}>
          Sélectionnez un type
        </Typography>
      )}
    </FormControl>

    {/* Client Dropdown */}
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{ borderRadius: 12 }}
      error={submitted && (!newAccount.clientId || newAccount.clientId === 0)}
    >
      <InputLabel>Client</InputLabel>
      <Select
        value={newAccount.clientId}
        onChange={(e) => setNewAccount({ ...newAccount, clientId: Number(e.target.value) })}
        required
        label="Client"
        sx={{ borderRadius: 12 }}
      >
        <MenuItem value={0} disabled sx={{ color: '#9e9e9e' }}>
          Sélectionnez un client
        </MenuItem>
        {clients.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {client.name} (ID: {client.id})
          </MenuItem>
        ))}
      </Select>
      {submitted && (!newAccount.clientId || newAccount.clientId === 0) && (
        <Typography color="error" sx={{ fontSize: '0.875rem', mt: 0.5 }}>
          Sélectionnez un client
        </Typography>
      )}
    </FormControl>

    {/* Submit Button */}
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      fullWidth
      sx={{
        mt: 3,
        py: 1.5,
        borderRadius: 12,
        backgroundColor: '#1a73e8',
        '&:hover': { backgroundColor: '#1557b0' },
        boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
        fontSize: '1rem',
        textTransform: 'none',
      }}
      onClick={() => setSubmitted(true)}
    >
      Créer Compte
    </Button>
  </form>
</Paper>

        </Grid>

        {/* Search Account Section */}
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
              Rechercher un Compte
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TextField
                label="ID du Compte"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                type="number"
                fullWidth
                variant="outlined"
                sx={{ mr: 2, borderRadius: 8 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetAccountById}
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
            {selectedAccount && (
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
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: '#1a73e8', fontWeight: 500 }}>
                    Détails du Compte:
                  </Typography>
                  <Typography variant="body1">
                    Type: <strong>{selectedAccount.type}</strong> - Solde: <strong>{selectedAccount.balance}€</strong>
                  </Typography>
                  <Typography variant="body2">
                    Client ID: {selectedAccount.clientId} (ID du compte: {selectedAccount.id})
                  </Typography>
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
          onClick={() => navigate('/account-details')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 8,
            backgroundColor: '#1a73e8',
            '&:hover': { backgroundColor: '#1557b0' },
            boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
          }}
        >
          Voir Tous les Comptes
        </Button>
      </Box>

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

export default AccountManagement;