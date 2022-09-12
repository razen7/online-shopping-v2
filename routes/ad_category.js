const adCategoryModel = require('../models/category.model');

const URL_Router = require('express').Router();

URL_Router.get('/', async (req, res) => {
    try {
        let queryCategories = await adCategoryModel.find();
        res.status(201).send(queryCategories);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

URL_Router.post('/add', async (req, res) => {
    const { name } = req.body;


    try { 
        let newCategory = new adCategoryModel({
            name
        });
        await newCategory.save();
        res.status(201).send('Category created with ID: ' + newCategory.id);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

URL_Router.get('/delete/:id', async (req, res) => {
    const cId = req.params.id;
    try {
        await adCategoryModel.findOneAndUpdate({ _id: cId }, { active: false })
        res.status(201).send('Category Deleted');
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = URL_Router;