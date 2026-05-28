import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from "@mui/material";
import { Add, Remove, FavoriteBorder } from "@mui/icons-material";

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
    <Grid
      container
      spacing={3}
      justifyContent="center"
    >
      {products.map((product, index) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return (
          <Grid
            item xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            sx={{
              display: "flex",
            }}
          >
            <Card
              sx={{
                width: "230px",
                height: "420px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "18px",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 18px 36px rgba(0,0,0,0.16)",
                },
              }}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.imageUrl}
                  sx={{
                    height: 150,
                    width: "100%",
                    objectFit: "contain",
                    padding: "16px",
                    background: `
                      radial-gradient(circle at top left, rgba(66,165,245,0.18), transparent 40%),
                      radial-gradient(circle at bottom right, rgba(25,118,210,0.12), transparent 35%),
                      linear-gradient(to bottom, #ffffff, #f7fbff)
                    `,
                    position: "relative",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(66,165,245,0.12)",
                    filter: "blur(18px)",
                    zIndex: 0,
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 30,
                    right: 30,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: "rgba(25,118,210,0.10)",
                    filter: "blur(16px)",
                    zIndex: 0,
                  }}
                />
                
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <FavoriteBorder sx={{ fontSize: 20, color: "#555"}}/>
                </Box>
                <CardContent
                  sx={{
                    padding: "16px",
                    "&:last-child": {
                      paddingBottom: "8px",
                    },
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: "17px",
                      fontWeight: 700,
                      letterSpacing: "-0.3px",
                      color: "#222",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      color: "#666",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography 
                    variant="h6"
                    sx={{
                      color: "#1976d2",
                      fontWeight: 700,
                      marginTop: "6px",
                      marginBottom: "2px",
                    }}
                  >
                    ₹ {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding:"16px",
                  marginTop:"auto",
                }}
              >
                {cartItem ? (
                  <Box
                    sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "16px",
                    marginTop: "auto",
                    }}
                  >
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
                      borderRadius: "14px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "15px",
                      padding: "10px 22px",
                      background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                      boxShadow: "0 6px 16px rgba(25,118,210,0.25)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 20px rgba(25,118,210,0.35)",
                      },
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