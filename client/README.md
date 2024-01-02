# Crypto Converter App - Frontend

## Introduction

Crypto Converter App is a React-based frontend application that allows users to convert cryptocurrencies into different fiat currencies. It provides real-time market data and conversion rates using a custom backend API.

## Features

- Real-time fetching of supported cryptocurrencies and fiat currencies.
- Market data display of various cryptocurrencies.
- Conversion of selected cryptocurrency to a desired fiat currency.
- Intuitive and user-friendly interface for easy operation.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Avi-J0506/currencyconvert.git
   ```

2. Navigate to the project directory:

   ```bash
   cd client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   This will launch the app in your default browser at `http://localhost:3000`.

## Usage

Upon launching the application, users can:

1. **Select a Cryptocurrency:** Choose from a list of available cryptocurrencies.
2. **Select a Fiat Currency:** Choose from a list of supported fiat currencies.
3. **Enter Amount:** Input the amount of cryptocurrency to convert.
4. **Convert:** Click the 'Convert' button to see the conversion result in the selected fiat currency.

## Structure

The application's source code is organized as follows:

- `src/App.js`: The main entry point of the React application.
- `src/pages/Home.jsx`: The main page of the app, containing the conversion logic and UI.
- `src/pages/Utils.js`: Utility functions to fetch data from the backend API.
- `src/components/Header`: A reusable header component.
- `src/home.scss`: Styling for the Home component.
