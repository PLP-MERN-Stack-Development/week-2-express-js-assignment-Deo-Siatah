const express = require('express');
const router = express.Router();
const products = require('../data');
const { v4: uuidv4 } = require('uuid');

//Get all products 
router.get('/products', (req,res) => {
    res.json(products);
});

//Get products:id
router.get('/products/:id', (req,res) =>{
    const product = products.find(p => p.id === req.params.id);

    if (!product){
        return res.status(400).json({message:'product not found'});
    }
    res.json(product);
});

//Create a new product 
router.post('/products', (req,res) => {
    const {name,description,price,category,inStock} = req.body;

    if(!name || !description || !price || !category || typeof inStock !== 'boolean'){
        return res.status(400).json({message:'Invalid product data. Ensure all fields are provided and correct.'});
    }

    //create new product object 
    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        category,
        inStock

    };
    products.push(newProduct);//Add to the products array
    res.status(201).json({message:'Product createdsuccessfully', product:newProduct});

});

//update existing product 
router.put('/products/:id', (req,res) => {
    const {id} = req.params;
    const {name,description,price,category,inStock}= req.body;

    //Find the product by ID 
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1){
        return res.status(404).json({message: 'Product not found'});
    }
    //Update product details 
    products[productIndex] = {
        ...products[productIndex],//keep existing properties
        name: name || products[productIndex].name,
        description:description || products[productIndex].description,
        price:price || products[productIndex].price,
        category:category || products[productIndex].category,
        inStock: inStock !== undefined? inStock: products[productIndex].inStock
    };
    res.json({message:'Product updated successfully',product:[productIndex]});
});

//Delete an existing product 
router.delete('/products/:id', (req,res) => {
    const {id} = req.params;
    //Find product index 
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1){
        return res.status(404).json({message:'Product not found'});
    }
    //Remove product from array
    products.splice(productIndex,1);
    res.json({message:'Product deleted successfully'});
});



module.exports = router;