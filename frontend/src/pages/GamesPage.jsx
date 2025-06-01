import { useState, useEffect } from 'react';
import { getGames, addToCart } from '../services/games'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

function GamesPage() {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    getGames()
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error('Error fetching games:', error)
      });
  }, []);

  const handleAddToCart = (gameId) => {
    const userId = 1;
    addToCart(userId, gameId)
      .then(() => {
        alert('Game added to cart!')
      })
      .catch((error) => {
        console.error('Error adding to cart:', error)
      })
  };

  return (
    <div>
      <h1>Games Page</h1>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} md={4} key={game.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{game.title}</Typography>
                <Typography>{game.description}</Typography>
                <Typography>Price: ${game.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(game.id)}
                  style={{ marginTop: '10px' }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GamesPage;
