import { useEffect, useState } from 'react';
import './App.css';
import { CurrencyConverter } from './Components/CurrencyConverter';

function CConverter() {
  const [metric, setMetric] = useState(1);
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('EUR');
  const [amount, setAmount] = useState();

  const selectClass = {
    marginInline: 5,
    borderRadius: 5,
  };
  // https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD
  useEffect(() => {
    async function getFetch() {
      const fetchUrl = `https://api.frankfurter.app/latest?amount=${metric}&from=${fromCur}&to=${toCur}`;
      console.log(fetchUrl);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${metric}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setAmount(data.rates[toCur]);
      } catch {}
    }
    fromCur === toCur ? setAmount(1) : getFetch();
  }, [metric, fromCur, toCur]);

  return (
    <div>
      <div>
        <form>
          <input
            type="text"
            style={selectClass}
            placeholder="Enter Amount.."
            value={metric}
            onChange={(e) => setMetric(Number(e.target.value))}
          />
          <select
            style={selectClass}
            value={fromCur}
            onChange={(e) => setFromCur(e.target.value)}
          >
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
            <option>CAD</option>
          </select>
          <select
            style={selectClass}
            value={toCur}
            onChange={(e) => setToCur(e.target.value)}
          >
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
            <option>CAD</option>
          </select>
        </form>
      </div>
      <button style={(selectClass, { margin: 15 })}>Convert</button>
      <div>
        <h3>
          The Amoint is {amount} {toCur}
        </h3>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CurrencyConverter />
      <CConverter />
    </div>
  );
}

export default App;
