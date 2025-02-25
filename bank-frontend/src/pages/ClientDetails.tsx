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
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchClients } from '../api/customerApi';
import { fetchAccountsByClientId } from '../api/accountApi';
import { Client } from '../types/client';
import { Account } from '../types/account';

const ClientDetails: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [clientAccounts, setClientAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false); 
  const [selectedClient, setSelectedClient] = useState<Client | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientResponse = await fetchClients();
        setClients(clientResponse);
        setError(null);
      } catch (err: any) {
        setError('Erreur lors du chargement des clients: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = async (client: Client) => {
    setSelectedClient(client);
    try {
      setLoading(true);
      const accountsResponse = await fetchAccountsByClientId(client.id);
      setClientAccounts(accountsResponse);
      setSuccess(`Comptes du client ID ${client.id} affichés !`);
      setError(null);
      setOpenModal(true);
    } catch (err: any) {
      setError('Erreur lors du chargement des comptes: ' + (err.response?.data?.message || err.message));
      setClientAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedClient(null);
    setClientAccounts([]); 
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
          Détails des Clients
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
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: '#1a73e8', fontWeight: 600, mb: 3 }}
        >
          Liste des Clients
        </Typography>
        {!loading && clients.length === 0 && (
          <Typography sx={{ color: '#757575' }}>Aucun client trouvé.</Typography>
        )}
        <List>
          {clients.map((client) => (
            <motion.div
              key={client.id}
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
                      {client.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">{client.email}</Typography>
                      <Typography variant="body2">ID: {client.id}</Typography>
                    </>
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(client)}
                  sx={{
                    borderRadius: 8,
                    backgroundColor: '#1a73e8',
                    '&:hover': { backgroundColor: '#1557b0' },
                    boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
                    size: 'small',
                  }}
                >
                  Voir Détails & Comptes
                </Button>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/clients')}
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

      {/* Modal for Client Details and Accounts */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#1a73e8',
            color: '#ffffff',
            p: 2,
            borderRadius: '4px 4px 0 0',
          }}
        >
          Détails & Comptes de {selectedClient?.name || 'le Client'}
        </DialogTitle>
        <DialogContent sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color="primary" />
            </Box>
          )}
          {selectedClient ? (
            <>
              <Typography variant="h6" sx={{ color: '#1a73e8', mb: 2 }}>
                {selectedClient.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Email: {selectedClient.email} (ID: {selectedClient.id})
              </Typography>
              <Typography variant="h6" sx={{ color: '#1a73e8', mt: 3, mb: 2 }}>
                Comptes Associés
              </Typography>
              {clientAccounts.length > 0 ? (
                <List>
                  {clientAccounts.map((account) => (
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
                          backgroundColor: '#ffffff',
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
                  ))}
                </List>
              ) : (
                <Typography sx={{ color: '#757575' }}>Aucun compte trouvé pour ce client.</Typography>
              )}
            </>
          ) : (
            <Typography sx={{ color: '#757575' }}>Aucun client sélectionné.</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 8,
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1557b0' },
              boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
            }}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

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

export default ClientDetails;