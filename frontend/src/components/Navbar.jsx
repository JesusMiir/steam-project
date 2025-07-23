import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  const backendUrl = import.meta.env.VITE_BACKEND_HOST;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Steam Clone
        </Typography>
        <Button color="inherit" component={Link} to="/games">
          Games
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
        <Button color="inherit" component={Link} to="/library">
          Library
        </Button>
        <Button color="inherit" onClick={() => window.location.href = `${backendUrl}/auth/google`}>
          Login con Google
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
