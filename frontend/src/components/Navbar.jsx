import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a1a" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Steam Clone
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/games">
            Games
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart
          </Button>
          <Button color="inherit" component={Link} to="/library">
            Library
          </Button>
        </Box>

        <Box sx={{ marginLeft: 2 }}>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">{user?.name}</Typography>
              <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
