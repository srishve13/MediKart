import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography
} from "@mui/material";
import ApiService from "../../service/ApiService";
import Loader from "../Loader";
  // Import the Loader component

const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when form submission starts

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("categoryId", categoryId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      const response = await ApiService.addProduct(formData);
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/products");
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Unable to upload product");
    } finally {
      setLoading(false);  // Set loading to false once the request is complete
    }
  };

  if (loading) {
    return <Loader />;  // Show loader while loading
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
        {message && (
          <Typography color="error" gutterBottom>
            {message}
          </Typography>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input type="file" hidden onChange={handleImage} />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                label="Select Category"
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProductPage;