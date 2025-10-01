// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const { user, role, loading, logoutLocal } = useAuth();
  const navigate = useNavigate();

  const isUser = role === "user" || role === "admin";
  const isAdmin = role === "admin";

  // --- debug temporal (borra luego) ---
  console.debug("NAV user:", user, "role:", role, "loading:", loading);
  // -------------------------------------

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a1a" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Steam Clone
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/games">Games</Button>

          {isUser && (
            <>
              <Button color="inherit" component={Link} to="/cart">Cart</Button>
              <Button color="inherit" component={Link} to="/library">Library</Button>
            </>
          )}

          {isAdmin && (
            <Button color="inherit" component={Link} to="/admin/games">Admin</Button>
          )}

          {loading ? (
            <CircularProgress size={18} sx={{ ml: 1 }} />
          ) : user ? (
            <>
              <Typography variant="body2" sx={{ mx: 1 }}>{user.email}</Typography>
              <Button
                color="inherit"
                onClick={() => { logoutLocal(); navigate("/"); }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
