export interface Account {
    id: number;
    balance: number;
    type: 'COURANT' | 'EPARGNE';
    clientId: number;
  }