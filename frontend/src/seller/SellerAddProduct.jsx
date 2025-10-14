import React, { useState } from 'react';

import axios from 'axios';

import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

const SellerAddProduct = () => {
  const [product, setProduct] = useState({
    category: '',
    name: '',
    description: '',
    cost: '',
    url: '',
    weight: '',         // Added for grocery quantity
    expiryDate: ''      // Added for freshness
  });

  const [productImage, setProductImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // 'success' or 'error'

  const sellerId = 1; // Replace with actual seller ID

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productimage', productImage);
    formData.append('category', product.category);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('cost', product.cost);
    formData.append('url', product.url);
    formData.append('weight', product.weight);
    formData.append('expiryDate', product.expiryDate);
    formData.append('sellerId', sellerId);

    try {
      const response = await axios.post(
        'http://localhost:2004/product/addproduct',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      setMessage(response.data);
      setSeverity('success');
      setOpenSnackbar(true);

      setProduct({
        category: '',
        name: '',
        description: '',
        cost: '',
        url: '',
        weight: '',
        expiryDate: ''
      });
      setProductImage(null);
    } catch (error) {
      setMessage(error.message);
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Grocery Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={product.category}
            label="Category"
            onChange={handleChange}
            required
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Fruits">Fruits</MenuItem>
            <MenuItem value="Vegetables">Vegetables</MenuItem>
            <MenuItem value="Dairy">Dairy</MenuItem>
            <MenuItem value="Bakery">Bakery</MenuItem>
            <MenuItem value="Beverages">Beverages</MenuItem>
            <MenuItem value="Snacks">Snacks</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          margin="normal"
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="cost"
          type="number"
          value={product.cost}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Weight (e.g., 500g, 1kg)"
          name="weight"
          value={product.weight}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Expiry Date"
          name="expiryDate"
          type="date"
          value={product.expiryDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Product URL (optional)"
          name="url"
          value={product.url}
          onChange={handleChange}
        />

        <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Product Image
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Add Product
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={severity} onClose={handleSnackbarClose}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SellerAddProduct;
