// apiRoutes.test.js
const request = require('supertest');
const express = require('express');
const apiRoutes = require('../routes/apiRoutes');
const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

describe('API Routes', () => {
  // Test for /api/supported-currencies
  it('GET /api/supported-currencies should return supported currencies', async () => {
    const res = await request(app).get('/api/supported-currencies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('crypto');
    expect(res.body).toHaveProperty('fiat');
    expect(res.body).toHaveProperty('others');
    // Additional assertions as needed
  });

  // Test for /api/top-currencies
  it('GET /api/top-currencies should return market data', async () => {
    const res = await request(app).get('/api/top-currencies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    // Additional assertions as needed
  });

  // Test for /api/calculate-price
  it('GET /api/calculate-price should calculate and return price', async () => {
    const res = await request(app)
      .get('/api/calculate-price')
      .query({ currency: 'bitcoin', supported: 'usd', amount: '2' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('currentPriceData');
    expect(res.body).toHaveProperty('total');
    // Additional assertions as needed
  });

  // Additional tests for error handling, edge cases, etc.
});
