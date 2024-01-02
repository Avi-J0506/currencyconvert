# Crypto Converter App - Backend

## Introduction

This is the backend server for the Crypto Converter App, a Node.js application using Express. It provides RESTful API endpoints for converting cryptocurrencies to various fiat currencies, fetching supported currencies, and retrieving market data.

## Features

- RESTful API endpoints for currency conversion and data retrieval.
- Integration with the CoinGecko API for real-time cryptocurrency data.
- Caching mechanisms for improved performance.
- Swagger documentation for easy API reference.

## Installation

To set up the server locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Avi-J0506/currencyconvert.git
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:5000`.

## API Endpoints

The server provides the following endpoints:

- `GET /api/supported-currencies`: Fetch a list of supported cryptocurrencies and fiat currencies.
- `GET /api/top-currencies`: Get market data for top cryptocurrencies.
- `GET /api/calculate-price`: Calculate the price of a specified amount of cryptocurrency in a given fiat currency.

## Swagger Documentation

Access the Swagger UI for detailed API documentation at `http://localhost:5000/api-docs`. This interactive documentation allows you to test the API endpoints directly from the browser and provides clear descriptions and usage examples.

## Structure

The server codebase is organized as follows:

- `src/server.js`: The main server file to set up and run the Express application.
- `src/routes/apiRoutes.js`: Routes for handling API requests.
- `src/services/currencyService.js`: Business logic for fetching data from the CoinGecko API and calculating prices.
- `src/utils/logger.js`: Utility for logging with Winston.
- `src/swagger.yaml`: Swagger configuration file for API documentation.
