import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Client } from '../types/client';

interface ClientFormProps {
  onSubmit: (client: Omit<Client, 'id'>) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
  const [client, setClient] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!client.name.trim()) {
      newErrors.name = 'Le nom est requis.';
    }

    if (!client.email.trim()) {
      newErrors.email = 'L’email est requis.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
      newErrors.email = 'Veuillez entrer un email valide.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(client);
      setClient({ name: '', email: '' });
      setErrors({});
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Nom"
        value={client.name}
        onChange={(e) => setClient({ ...client, name: e.target.value })}
        required
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ borderRadius: 8, backgroundColor: '#fff' }}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        value={client.email}
        onChange={(e) => setClient({ ...client, email: e.target.value })}
        required
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ borderRadius: 8, backgroundColor: '#fff' }}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 8,
          backgroundColor: '#1a73e8',
          '&:hover': { backgroundColor: '#1557b0' },
          boxShadow: '0 2px 6px rgba(26, 115, 232, 0.2)',
        }}
      >
        Ajouter Client
      </Button>
    </Box>
  );
};

export default ClientForm;