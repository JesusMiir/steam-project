import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user } = useAuth();   // <- NO uses useAuth0

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a1a" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Steam Clone
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/games">GAMES</Button>
          <Button color="inherit" component={Link} to="/cart">CART</Button>
          <Button color="inherit" component={Link} to="/library">LIBRARY</Button>
        </Box>

        <Box sx={{ marginLeft: 2 }}>
          {!user ? (
            <Button color="inherit" component={Link} to="/login">LOGIN</Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">{user.name ?? user.email}</Typography>
              <Button
                color="inherit"
                onClick={() => {
                  fetch("http://localhost:3000/auth/logout", { credentials: "include" })
                    .finally(() => window.location.replace("/"));
                }}
              >
                LOGOUT
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
