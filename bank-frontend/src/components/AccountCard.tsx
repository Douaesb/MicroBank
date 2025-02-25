import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Account } from '../types/account';

interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{account.type}</Typography>
        <Typography>Solde: {account.balance} €</Typography>
        <Typography>ID Client: {account.clientId}</Typography>
      </CardContent>
    </Card>
  );
};

export default AccountCard;