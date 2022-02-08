import { Container, Typography } from '@mui/material';

export default function Profile() {
  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <Typography>This page shouldn't show the error toast.</Typography>
    </Container>
  );
}
