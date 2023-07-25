import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [date, setDate] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await axios.post('http://localhost:5000/api/fetchStockData', { stockSymbol, date: formattedDate });
      console.log(response.data);
      setStockData(response.data);
      setError(null);
      setStockSymbol("")
      setDate("")
    } catch (err) {
      setStockData(null);
      setError('Error fetching  data. Please check your input and try again.');
      window.alert('Error fetching  data. Please check your input and try again.');
    }
  };

  // const formatDate = (dateString) => {
  //   const dateObj = new Date(dateString);
  //   const year = dateObj.getFullYear();
  //   const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  //   const day = String(dateObj.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="stockSymbol">Stock Symbol:</label>
        <input
          type="text"
          id="stockSymbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          required
        />
        <br />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {stockData && (
        <div className="stock-data">
          <h2>Stock Data:</h2>
          <table>
            <tbody>
              <tr>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
              <tr>
                <td>{stockData.open}</td>
                <td>{stockData.high}</td>
                <td>{stockData.low}</td>
                <td>{stockData.close}</td>
                <td>{stockData.volume}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
