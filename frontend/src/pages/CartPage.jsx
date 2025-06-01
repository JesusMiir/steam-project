import { useState, useEffect } from 'react';
import { getCart, checkoutCart } from '../services/cart';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

function CartPage() {
  const [cart, setCart] = useState(null);
  const userId = 1;

  useEffect(() => {
    getCart(userId)
      .then((response) => {
        console.log(response)
        setCart(response.data)
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      })
  }, [])

  const handleCheckout = () => {
    checkoutCart(userId)
      .then(() => {
        alert('Checkout completed!');
        setCart(null);
      })
      .catch((error) => {
        console.error('Error during checkout:', error)
      })
  };

  if (!cart || cart.cartItems.length === 0) return <p>No items in cart.</p>;

  return (
    <div>
      <h1>Cart Page</h1>
      <Grid container spacing={2}>
        {cart.cartItems.map((item) => (
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
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCheckout}
        style={{ marginTop: '20px' }}
      >
        Checkout
      </Button>
    </div>
  );
}

export default CartPage;
