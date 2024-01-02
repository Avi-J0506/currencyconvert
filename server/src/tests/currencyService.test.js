// currencyService.test.js
const { getSupportedCurrencies, getMarketData, calculatePrice } = require('../services/currencyService');
const nock = require('nock');
const axios = require('axios');

jest.mock('axios');

describe('currencyService', () => {
  // Test for getSupportedCurrencies
  it('getSupportedCurrencies should fetch and return supported currencies', async () => {
    const mockResponse = ["btc", "eth", "ltc", "bch", "bnb", "eos", "xrp", "xlm", "link", "dot", "yfi", "usd"]; // truncated for brevity
    axios.get.mockResolvedValue({ data: mockResponse });

    const result = await getSupportedCurrencies();
    expect(result.crypto).toContain('btc');
    expect(result.fiat).toContain('usd');
    expect(result.others).toEqual([]);
  });

  // Test for getMarketData
  it('getMarketData should fetch and return market data', async () => {
    const mockResponse = [{ id: "bitcoin", symbol: "btc", name: "Bitcoin"}]; // truncated for brevity
    axios.get.mockResolvedValue({ data: mockResponse });

    const result = await getMarketData();
    expect(result[0].id).toBe('bitcoin');
    expect(result[0].symbol).toBe('btc');
    // Assert other properties as needed
  });

  // Test for calculatePrice
  it('calculatePrice should calculate and return price', async () => {
    const mockResponse = { bitcoin: { usd: 10000 } };
    const currency = 'bitcoin';
    const supported = 'usd';
    const amount = 2;
    axios.get.mockResolvedValue({ data: mockResponse });

    const result = await calculatePrice(currency, supported, amount);
    expect(result.currentPriceData).toBe(10000);
    expect(result.total).toBe(20000);
  });

  // Additional tests for error handling, caching, etc.
});
