const Product = require('../models/products.model');

exports.getAllProducts = (req, res) => {
    Product.getAll((err, products) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(products);
    });
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    Product.getById(id, (err, product) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    });
};

exports.createProduct = (req, res) => {
    const { nama, deskripsi, harga, foto } = req.body;
    if (!nama || !harga) {
        return res.status(400).json({ message: 'Nama and harga are required' });
    }
    Product.create({ nama, deskripsi, harga, foto }, (err, newProduct) => {
        if (err) return res.status(500).json({ message: 'Error creating product' });
        res.status(201).json(newProduct);
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi, harga, foto } = req.body;
    if (!nama || !harga) {
        return res.status(400).json({ message: 'Nama and harga are required' });
    }
    Product.update(id, { nama, deskripsi, harga, foto }, (err, updatedProduct) => {
        if (err) {
            if (err.message === 'Product not found') return res.status(404).json({ message: err.message });
            return res.status(500).json({ message: 'Error updating product' });
        }
        res.json(updatedProduct);
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.delete(id, (err, result) => {
        if (err) {
            if (err.message === 'Product not found') return res.status(404).json({ message: err.message });
            return res.status(500).json({ message: 'Error deleting product' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
};
