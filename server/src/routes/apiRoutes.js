const express = require('express');
const router = express.Router();
const currencyService = require('../services/currencyService');

// GET endpoint for fetching supported currencies
router.get('/supported-currencies', async (req, res) => {
  try {
    const data = await currencyService.getSupportedCurrencies();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint for fetching market data
router.get('/top-currencies', async (req, res) => {
  try {
    const data = await currencyService.getMarketData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint for calculating price
router.get('/calculate-price', async (req, res) => {
    const { currency, supported, amount } = req.query;
  
    if (!currency || !supported || !amount) {
      return res.status(400).json({ error: 'Please provide currency, supported, and amount parameters' });
    }
  
    try {
      const data = await currencyService.calculatePrice(currency, supported, amount);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;
