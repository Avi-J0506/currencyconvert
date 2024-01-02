import axios from "axios";

// Use environment variable for the API base URL or default to localhost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Function to fetch supported currencies
export const fetchSupportedCurrencies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/supported-currencies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching supported currencies:", error);
    return {
      error: error.response
        ? error.response.data.error
        : "Error fetching supported currencies",
    };
  }
};

// Function to fetch market data
export const fetchMarketData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/top-currencies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return {
      error: error.response
        ? error.response.data.error
        : "Error fetching market data",
    };
  }
};

// Function to calculate price
export const calculatePrice = async (currency, supported, amount) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/calculate-price?currency=${encodeURIComponent(
        currency
      )}&supported=${encodeURIComponent(supported)}&amount=${encodeURIComponent(
        amount
      )}`
    );
    return response.data;
  } catch (error) {
    console.error("Error calculating price:", error);
    return {
      error: error.response
        ? error.response.data.error
        : "Error calculating price",
    };
  }
};
