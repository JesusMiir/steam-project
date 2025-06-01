import { useState, useEffect } from 'react';
import { getLibrary } from '../services/library';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function LibraryPage() {
  const [library, setLibrary] = useState([]);
  const userId = 1; // Puedes cambiar este ID si tienes otro

  useEffect(() => {
    getLibrary(userId)
      .then((response) => {
        setLibrary(response.data);
      })
      .catch((error) => {
        console.error('Error fetching library:', error);
      });
  }, []);

  if (library.length === 0) {
    return <p>No games in your library.</p>;
  }

  return (
    <div>
      <h1>Your Library</h1>
      <Grid container spacing={2}>
        {library.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{item.game.title}</Typography>
                <Typography>{item.game.description}</Typography>
                <Typography>Price: ${item.game.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LibraryPage;
