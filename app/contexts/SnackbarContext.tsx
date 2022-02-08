import { Alert, AlertColor, Snackbar } from '@mui/material';
import * as React from 'react';

type SnackBarContextActions = {
  showAlert: (text: string, severity: AlertColor) => void;
};

const SnackbarContext = React.createContext<SnackBarContextActions | null>(
  null
);

export function useSnackbar() {
  const context = React.useContext(SnackbarContext);

  if (context === null) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
}

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string>();
  const [severity, setSeverity] = React.useState<AlertColor>('info');

  const showAlert = (message: string, severity: AlertColor) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
        onClose={hideAlert}
        open={open}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
