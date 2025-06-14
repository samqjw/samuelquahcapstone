import { useState } from 'react';
import './App.css';

const ShareChecker = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Light validation: Skip API call if anything is empty
    if (!symbol || !quantity || !price) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`
      );
      const data = await res.json();
      const quote = data["Global Quote"];

      if (quote && quote["05. price"]) {
        const currentPrice = parseFloat(quote["05. price"]);
        const purchasePrice = parseFloat(price);
        const qty = parseInt(quantity);
        const profitLoss = ((currentPrice - purchasePrice) * qty).toFixed(2);

        setResults(prev => [
          ...prev,
          {
            symbol: quote["01. symbol"],
            quantity: qty,
            purchasePrice: purchasePrice.toFixed(2),
            currentPrice: currentPrice.toFixed(2),
            profitLoss,
          }
        ]);

        setSymbol('');
        setQuantity('');
        setPrice('');
      }
    } catch (err) {
      console.error('Failed to fetch share data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          flexWrap: 'wrap',
          maxWidth: '500px',
        }}
      >
        <label>
          Share Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            required
          />
        </label>

        <label>
          Quantity of Shares:
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) setQuantity(val);
            }}
            required
          />
        </label>

        <label>
          Purchase Price:
          <input
            type="text"
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(val)) setPrice(val);
            }}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Submit'}
        </button>
      </form>

      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Checked Stocks:</h3>
          {results.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
              }}
            >
              <p><strong>Stock Symbol:</strong> {item.symbol}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Purchase Price:</strong> ${item.purchasePrice}</p>
              <p><strong>Current Price:</strong> ${item.currentPrice}</p>
              <p><strong>Profit/Loss:</strong> ${item.profitLoss}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareChecker;
