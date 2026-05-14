import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { TextField, Button, MenuItem, Grid, Typography, Box, Input } from '@mui/material';
import Loader from '../Loader';  // Import the Loader component

const EditProductPage = () => {
    const { productId } = useParams();
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(''); // Store the category ID
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [submitting, setSubmitting] = useState(false); // Submitting state
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true); // Start loading
        ApiService.getAllCategory().then((res) => {
            setCategories(res.categoryList); // Set categories

            if (productId) {
                ApiService.getProductById(productId).then((response) => {
                    setName(response.product.name);
                    setDescription(response.product.description);
                    setPrice(response.product.price);
                    setCategoryId(response.product.categoryId); // Set the categoryId for the dropdown
                    setImageUrl(response.product.imageUrl);
                    
                    setLoading(false); // End loading once data is fetched
                }).catch(() => {
                    setLoading(false); // End loading even if there's an error
                });
            } else {
                setLoading(false); // End loading if no productId
            }
        }).catch(() => {
            setLoading(false); // End loading in case of an error
        });
    }, [productId]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true); // Show loader during submission
        setMessage(''); // Clear any previous messages

        // Check if categoryId is empty or undefined
        if (!categoryId || categoryId === '') {
            setMessage('Category is required');
            setSubmitting(false); // Stop loader
            return;
        }

        try {
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }
            formData.append('productId', productId);
            formData.append('categoryId', categoryId);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);

            const response = await ApiService.updateProduct(formData);
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/products');
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to update product');
        } finally {
            setSubmitting(false); // Stop loader after submission
        }
    };

    // Show loader while fetching data or submitting the form
    if (loading || submitting) {
        return <Loader />;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
            <Typography variant="h4" gutterBottom>Edit Product</Typography>
            {message && <Typography color="error">{message}</Typography>}
            
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Input type="file" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt={name} style={{ width: 80, maxHeight: 60, objectFit: 'cover' }} />}
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        select
                        label="Category"
                        fullWidth
                        value={categoryId}  // Pre-select the category based on categoryId
                        onChange={(e) => setCategoryId(e.target.value)}  // Handle dropdown selection
                        variant="outlined"
                    >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem value={cat.id} key={cat.id}>
                                {cat.name} {/* Show category name */}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Product Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        fullWidth
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update Product
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditProductPage;