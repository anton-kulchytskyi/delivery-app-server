const express = require('express');
const router = express.Router();
const Shops = require('../models/shops');

router.get('/', async (req, res) => {
  try {
    const shops = await Shops.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getShop, (req, res) => {
  res.json(res.shops)
});

router.post('/', async (req, res) => {
  const shop = new Shops({
    name: req.body.name,
    foods: req.body.foods.split(', '),
  });

  try {
    newShop = await shop.save()
    res.status(201).json(newShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', getShop, async (req, res) => {
  if (req.body.name !== null) {
    res.shops.name = req.body.name;
  }

  if (req.body.foods !== null) {
    res.shops.foods = res.shops.foods.concat(req.body.foods);
  }

  try {
    const updateShop = await Shops.updateOne()
    res.json(updateShop)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getShop, async (req, res) => {
  try {
    await Shops.findOneAndDelete();
    res.json({ message: 'Deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getShop(req, res, next) {
  let shop;
  try {
    shop = await Shops.findById(req.params.id)
    if (shop === null) {
      return res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.shops = shop;
  next();
}


module.exports = router;