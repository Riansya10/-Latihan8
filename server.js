require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8001;

app.use(express.json());

// Import Routes
const userRoutes = require('./routes/user.routes');
const productsRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
