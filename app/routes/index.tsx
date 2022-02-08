import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useTransition,
} from 'remix';
import { useSnackbar } from '~/contexts/SnackbarContext';
import { authenticate } from '~/models/auth.server';
import * as React from 'react';

interface ActionData {
  formError?: string;
  fields?: {
    username: string;
    password: string;
  };
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const formData = await request.formData();
  const { username, password } = Object.fromEntries(formData);

  if (typeof username !== 'string' || typeof password !== 'string') {
    return { formError: 'Form not submitted correctly' };
  }

  const user = await authenticate({ username, password });

  if (user === null) {
    return {
      fields: { username, password },
      formError: 'Invalid username or password',
    };
  }

  return redirect('/profile');
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const { showAlert } = useSnackbar();
  const transition = useTransition();

  // ???
  React.useEffect(() => {
    if (actionData?.formError !== undefined && transition.submission) {
      showAlert(actionData.formError, 'error');
    }
  }, [actionData?.formError, transition.submission, showAlert]);

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ my: 4 }}>
        Sign in
      </Typography>
      <Card sx={{ p: 4 }}>
        <Form method="post">
          <TextField
            autoFocus
            defaultValue="test"
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            variant="outlined"
          />
          <TextField
            defaultValue="T3st1ng"
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
          />
          <Typography variant="caption">test / T3st1ng</Typography>
          <Button
            color="primary"
            disableElevation
            fullWidth
            sx={{ mt: 4 }}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </Form>
      </Card>
      <Box sx={{ textAlign: 'left', mt: 2 }}>
        <Typography>Step to reproduce:</Typography>
        <ol>
          <li>
            Sign-in with wrong creds
            <ul>
              <li style={{ color: 'green' }}>Toast shows correctly ✓</li>
            </ul>
          </li>
          <li>
            Sign-in with right creds
            <ul>
              <li style={{ color: 'red' }}>Toast shows incorrectly ×</li>
            </ul>
          </li>
        </ol>
      </Box>
    </Container>
  );
}
