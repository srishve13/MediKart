import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Grid, Typography, Snackbar, Alert } from "@mui/material"; 
import '../../style/addCategory.css';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createCategory({ name });
            if (response.status === 200) {
                setMessage(response.message);
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate("/admin/categories");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to save a category");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: "80vh" }}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Add Category
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} className="category-form">
                        <TextField
                            fullWidth
                            label="Category Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "20px" }}
                        >
                            Add
                        </Button>
                    </form>
                </Grid>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={message.includes("Failed") ? "error" : "success"}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AddCategory;
