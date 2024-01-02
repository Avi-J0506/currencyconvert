const axios = require('axios');
const NodeCache = require('node-cache');
const logger = require('../utils/logger');

// Initialize cache with a standard TTL (time to live) of
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 2400 });

// Fetches the supported currencies from CoinGecko API with caching
const getSupportedCurrencies = async () => {
  const cacheKey = 'supportedCurrencies';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    logger.info("Fetching supported currencies from cache");
    return cachedData;
  } else {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
      const data = {
        crypto: response.data.slice(0, 11),
        fiat: response.data.slice(11, 57),
        others: response.data.slice(57)
      };
      cache.set(cacheKey, data);
      logger.info("Supported currencies fetched from API and cached");
      return data;
    } catch (error) {
      logger.error('Error fetching supported currencies: ' + error.message);
      throw error;
    }
  }
};

// Fetches market data for cryptocurrencies from CoinGecko API with caching
const getMarketData = async () => {
  const cacheKey = 'marketData';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    logger.info("Fetching market data from cache");
    return cachedData;
  } else {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      const data = response.data.map(coin => ({
        id: coin.id,
        image: coin.image,
        name: coin.name,
        symbol: coin.symbol
      }));
      cache.set(cacheKey, data);
      logger.info("Market data fetched from API and cached");
      return data;
    } catch (error) {
      logger.error('Error fetching market data: ' + error.message);
      throw error;
    }
  }
};
// Calculates the price of a given amount of cryptocurrency
const calculatePrice = async (currency, supported, amount) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currency.toLowerCase()}&vs_currencies=${supported.toLowerCase()}`);
    const curr = response.data[currency.toLowerCase()]; 
    let price = curr[supported.toLowerCase()];
    const total = Number(price) * Number(amount);
    logger.info(`Price calculated for ${currency} to ${supported}, Amount: ${amount}`);
    return { currentPriceData: price, total: total };
  } catch (error) {
    logger.error('Error fetching price data: ' + error.message);
    throw error;
  }
};

module.exports = { getSupportedCurrencies, getMarketData, calculatePrice };
