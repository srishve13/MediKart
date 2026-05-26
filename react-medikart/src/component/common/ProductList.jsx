import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductList = ({ products }) => {
  const { cart, dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: 370,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "18px",
                overflow: "hidden",
                boxshadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                backgroundColor: "#fff",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.imageUrl}
                  sx={{
                    height: 180,
                    width: "100%",
                    objectFit: "contain",
                    padding: "16px",
                    backgroundColor: "#f8f9fb",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: "17px",
                      fontWeight: 600,
                      minHeight: "48px",
                      overflow: "hidden",
                      color: "#222",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "14px",
                      minHeight: "42px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography 
                    variant="h6"
                    sx={{
                      color: "#1976d2",
                      fontWeight: 700,
                      marginTop: "10px",
                    }}
                  >
                    ₹ {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Link>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
                {cartItem ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => decrementItem(product)} size="small">
                      <Remove />
                    </IconButton>
                    <Typography variant="body1" sx={{ margin: '0 10px' }}>
                      {cartItem.quantity}
                    </Typography>
                    <IconButton onClick={() => incrementItem(product)} size="small">
                      <Add />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product)}
                    sx={{
                      borderRadius: "999px",
                      textTransform: "none",
                      fontWeight: 600,
                      padding: "8px 18px",
                      boxShadow: "none",
                      fontSize: "14px",
                    }}
                  >
                    Add To Cart
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductList;