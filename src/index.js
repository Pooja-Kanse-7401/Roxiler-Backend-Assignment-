
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models/Product'); 
const app = express();
const PORT = 5000;
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

app.use(cors());
// MongoDB connection
// mongoose.connect(`mongodb+srv://kansepd:zvfp4XN4qINeUV8L@cluster0.jm3ij.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0`,{
mongoose.connect(`mongodb://localhost:27017/product`,{
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.get('/api/seed', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const products = response.data;
  
    await Product.deleteMany();

    await Product.insertMany(products);

    res.status(200).send({ message: 'Database seeded successfully!', productsCount: products.length });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while seeding the database.');
  }
});



app.get('/api/products', async (req, res) => {
    try{
       const productsData = await Product.find();
       res.status(200).send(productsData);
    }catch(error){
        res.status(500).json({message : "internal server error", error});
    }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

