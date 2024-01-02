import React from "react";
import Header from "../components/Header";
import "./home.scss";
import { useState, useEffect, useRef } from "react";
import {
  fetchSupportedCurrencies,
  fetchMarketData,
  calculatePrice,
} from "./Utils";

const Home = () => {
  // State variables
  const [selectedCurr, setSelectedCurr] = useState("bitcoin"); // Selected cryptocurrency
  const [selectedSupp, setSelectedSupp] = useState("usd"); // Selected fiat currency
  const [tokenS, setTokenS] = useState(false); // Toggle for token selection state
  const [popup, setPopup] = useState(false); // Popup display state
  const [supportedCurrencies, setSupportedCurrencies] = useState([]); // List of supported fiat currencies
  const [supportedOrig, setSupportedOrig] = useState([]);
  const [marketData, setMarketData] = useState([]); // Market data for cryptocurrencies
  const [marketOrig, setMarketOrig] = useState([]);
  const [amount, setAmount] = useState(null); // Amount for conversion
  const [priceDetails, setPriceDetails] = useState([]); // Details of calculated price
  const [searchTerm, setSearchTerm] = useState("");
  // Effect hook for fetching initial data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch supported currencies if not already fetched
      if (supportedCurrencies.length === 0) {
        const supportedCurrenciesData = await fetchSupportedCurrencies();
        if (supportedCurrenciesData.error) {
          // Handle error scenario (e.g., setError(supportedCurrenciesData.error))
          console.log(supportedCurrenciesData.error);
        } else {
          let supp = [];
          supp = [
            ...supportedCurrenciesData.fiat,
            ...supportedCurrenciesData.crypto,
            ...supportedCurrenciesData.others,
          ];
          setSupportedOrig(supp);
          setSupportedCurrencies(supp);
        }
      }

      // Fetch market data if not already fetched
      if (marketData.length === 0) {
        const marketDataResponse = await fetchMarketData();
        if (marketDataResponse.error) {
          console.log(marketDataResponse.error);
          // Handle error scenario (e.g., setError(marketDataResponse.error))
        } else {
          setMarketOrig(marketDataResponse);
          setMarketData(marketDataResponse);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      tokenS
        ? setMarketData(marketOrig)
        : setSupportedCurrencies(supportedOrig);

      //return
    } else {
      const filteredData = tokenS
        ? marketData.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : supportedCurrencies.filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
          );
      tokenS
        ? setMarketData(filteredData)
        : setSupportedCurrencies(filteredData);
    }
  }, [searchTerm]);

  //close the popup
  const popupRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popup &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setPopup(false);
      }
    }
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popup]); // dependency array includes popup to re-run effect when it changes

  // Function to handle currency conversion
  const convert = async () => {
    console.log(amount);

    if (amount === "") {
      //console.log("entered")

      alert("Please fill in the amount first");
      return;
    }
    if (isNaN(parseInt(amount))) {
      alert("Amount must be a number");
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert("Amount must be a positive value");
      return;
    }
    const output = await calculatePrice(selectedCurr, selectedSupp, amount);
    if (output.error) {
      console.log(output.error);
      if (output.error.includes("429")) {
  // Display an alert with the message "Too Many Requests"
  alert("Too Many Requests");
}
      // Handle error scenario (e.g., setError(output.error))
    } else {
      setPriceDetails(output);
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        {/* Popup for currency and token selection */}
        {popup && (
          <div className="overlay">
            <div className="popup" ref={popupRef}>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="player-list">
                {/* Display market data or supported currencies based on tokenS state */}
                {tokenS
                  ? marketData.map((item, index) => (
                      <div
                        key={index}
                        className="play"
                        onClick={() => {
                          setPopup(false);
                          setSelectedCurr(item.id);
                        }}
                      >
                        <div className="left">
                          <img src={item.image} alt={item.name} />{" "}
                          <div className="left-r">
                            <div className="upper">{item.name}</div>
                            <div className="lower">{item.symbol}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  : supportedCurrencies.map((item, index) => (
                      <div
                        key={index}
                        className="play"
                        onClick={() => {
                          setPopup(false);
                          setSelectedSupp(item);
                        }}
                      >
                        <div className="left">
                          <div className="left-r">
                            <div className="upper">{item.toUpperCase()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        )}
        {/* Main content */}
        <div className="left">
          <div className="left-inner">
            <div className="top">Currency Converter</div>
            {/* Cryptocurrency selection */}
            <div className="currency">
              <div
                className="item head"
                onClick={() => {
                  setTokenS(true);
                  setPopup(true);
                }}
              >
                {" "}
                Select a token
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="#fff"
                  height="20px"
                >
                  {" "}
                  <defs></defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="_1" data-name="1">
                      <path
                        class="cls-1"
                        d="M24 48a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-46a22 22 0 1 0 22 22A22 22 0 0 0 24 2z"
                      />
                      <path
                        class="cls-1"
                        d="M4 23h4v2H4zM40 23h4v2h-4zM23 4h2v4h-2zM23 40h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 8.406 33)"
                        d="M6.41 32h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 39.594 15.007)"
                        d="M37.59 14h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 14.996 39.591)"
                        d="M13 38.59h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 33.001 8.412)"
                        d="M31 7.41h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 15.004 8.42)"
                        d="M14 6.41h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 33.013 39.586)"
                        d="M32 37.59h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 8.41 14.994)"
                        d="M7.41 13h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 39.582 33.002)"
                        d="M38.59 31h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        d="M24 34a1 1 0 0 1-.45-.11A1 1 0 0 1 23 33v-4l-6.4 4.8A1 1 0 0 1 15 33V15a1 1 0 0 1 1.6-.8L23 19v-4a1 1 0 0 1 1.6-.8l12 9a1 1 0 0 1 0 1.6l-12 9a1 1 0 0 1-.6.2zm0-8a1 1 0 0 1 .45.11A1 1 0 0 1 25 27v4l9.33-7L25 17v4a1 1 0 0 1-1.6.8L17 17v14l6.4-4.8a1 1 0 0 1 .6-.2z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              {selectedCurr !== "" && (
                <div className="item val">{selectedCurr.toUpperCase()}</div>
              )}
            </div>
            {/* Fiat currency selection */}
            <div className="currency">
              <div
                className="item head"
                onClick={() => {
                  setTokenS(false);
                  setPopup(true);
                }}
              >
                {" "}
                Select the currency
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="#fff"
                  height="20px"
                >
                  {" "}
                  <defs></defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="_1" data-name="1">
                      <path
                        class="cls-1"
                        d="M24 48a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-46a22 22 0 1 0 22 22A22 22 0 0 0 24 2z"
                      />
                      <path
                        class="cls-1"
                        d="M4 23h4v2H4zM40 23h4v2h-4zM23 4h2v4h-2zM23 40h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 8.406 33)"
                        d="M6.41 32h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 39.594 15.007)"
                        d="M37.59 14h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 14.996 39.591)"
                        d="M13 38.59h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 33.001 8.412)"
                        d="M31 7.41h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 15.004 8.42)"
                        d="M14 6.41h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 33.013 39.586)"
                        d="M32 37.59h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 8.41 14.994)"
                        d="M7.41 13h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 39.582 33.002)"
                        d="M38.59 31h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        d="M24 34a1 1 0 0 1-.45-.11A1 1 0 0 1 23 33v-4l-6.4 4.8A1 1 0 0 1 15 33V15a1 1 0 0 1 1.6-.8L23 19v-4a1 1 0 0 1 1.6-.8l12 9a1 1 0 0 1 0 1.6l-12 9a1 1 0 0 1-.6.2zm0-8a1 1 0 0 1 .45.11A1 1 0 0 1 25 27v4l9.33-7L25 17v4a1 1 0 0 1-1.6.8L17 17v14l6.4-4.8a1 1 0 0 1 .6-.2z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              {selectedSupp !== "" && (
                <div className="item val">{selectedSupp.toUpperCase()}</div>
              )}
            </div>
            {/* Amount input */}
            <div className="currency">
              <div className="item">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  placeholder="Enter amount"
                />
              </div>{" "}
            </div>
            {/* Convert button */}
            <div className="convert" onClick={convert}>
              Convert
            </div>

            {/* Displaying conversion result */}
            {priceDetails.length !== 0 && (
              <div className="currency">
                <>
                  <div
                    className="item"
                    onClick={() => {
                      setTokenS(true);
                      setPopup(true);
                    }}
                  >
                    {" "}
                    Price Per Token : {priceDetails.currentPriceData}
                  </div>

                  <div className="item val">
                    Total Amount : {priceDetails.total}
                  </div>
                </>
              </div>
            )}
          </div>
        </div>

        {/* <div className="right">
                <div className="inner"></div> 
                    
                 </div> */}
      </div>
    </>
  );
};

export default Home;
