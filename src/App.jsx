import React, { useState, createContext } from "react";
import CheckShare from "./checkshare";

export const ShareContext = createContext();

export default function App() {
  const [searchHistory, setSearchHistory] = useState([]);

  const addToHistory = (entry) => {
    setSearchHistory((prev) => [entry, ...prev]);
  };

  return (
    <ShareContext.Provider value={{ searchHistory, addToHistory }}>
      <div className="p-6 max-w-xl mx-auto" >
       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img src="src/stock.png" alt="Share Checker Logo" style={{ width: '45px', height: '45px' }}/>
        <h1 className="text-2xl font-bold mb-4">Stock Profit Checker</h1>
        </div>
        <CheckShare />
        
        <div className="mt-6 space-y-4">
          {searchHistory.map((entry, index) => (
            <div key={index} className="border p-4 rounded bg-gray-100">
              <p><strong>Stock Symbol:</strong> {entry.symbol}</p>
              <p><strong>Quantity:</strong> {entry.quantity}</p>
              <p><strong>Purchase Price:</strong> ${entry.purchasePrice}</p>
              <p><strong>Current Price:</strong> ${entry.currentPrice}</p>
              <p>
                <strong>Profit/Loss:</strong>{' '}
                <span
                  style={{
                    color: parseFloat(item.profitLoss) >= 0 ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  ${item.profitLoss}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </ShareContext.Provider>
  );
}
