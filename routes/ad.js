const adModel = require('../models/ad.model');

const URL_Router = require('express').Router();

URL_Router.get('/', async (req, res) => {
    try {
        let queryAds = await adModel
            .find()
            .populate("seller", "name")
            .populate("interestedBuyers", "name")
            .populate("buyer", "name")
            .populate("ad_category", "title");
        res.status(201).send(queryAds);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

URL_Router.post('/add', async (req, res) => {
    const { title, description, price, sellerId, categoryId } = req.body;

    try {
        let newAd = new adModel({
            title, description, price,
            seller: sellerId,
            category: categoryId
        });
        await newAd.save();
        res.status(201).send('Ad created with ID: ' + newAd.id);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

URL_Router.post('/delete/:id', async (req, res) => {
    try {
        await adModel.findOneAndUpdate({ _id: req.params.id }, { active: false })
        res.status(201).send('Ad Deleted');
    } catch (e) {
        res.status(400).send(e.message);
    }
});

URL_Router.post('/showBuyingInterest', async (req, res) => {
    const { userId, adId } = req.body;
    try {
        await adModel.findOneAndUpdate({ _id: adId }, {
            $addToSet: {
                interestedBuyers: userId
            }
        })
        res.status(201).send('Interest Registered');
    } catch (e) {
        res.status(400).send(e.message);
    }
});

URL_Router.post('/close', async (req, res) => {
    const { userId, adId } = req.body;
    try {
        await adModel.findOneAndUpdate({ _id: adId }, { buyer: userId, active: false })
        res.status(201).send('Ad closed');
    } catch (e) {
        res.status(400).send(e.message);
    }
});
module.exports = URL_Router;