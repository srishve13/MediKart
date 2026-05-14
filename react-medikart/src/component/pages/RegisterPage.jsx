import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Snackbar, 
    Alert 
} from '@mui/material';
import Loader from '../Loader'; // Import the Loader component

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: ''
    });

    const [message, setMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state for Loader
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Show loader during the request
        try {
            const response = await ApiService.registerUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Registered");
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to register a user");
            setOpenSnackbar(true);
        } finally {
            setLoading(false);  // Hide loader after the request completes
        }
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        setMessage(null);
    };

    return (
        <Container maxWidth="sm">
            {loading ? (
                <Loader />  // Show Loader while loading
            ) : (
                <>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginTop: '20px' }}>
                        Register
                    </Typography>
                    {message && (
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                            <Alert onClose={handleSnackbarClose} severity={message.includes('Successfully') ? 'success' : 'error'}>
                                {message}
                            </Alert>
                        </Snackbar>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phoneNumber"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '10px' }}>
                                <Typography variant="body2">
                                    Already have an account? <a href="/login" style={{ textDecoration: 'none', color: '#3f51b5' }}>Login</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </Container>
    );
}

export default RegisterPage;