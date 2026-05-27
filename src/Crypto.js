import React, { useState } from "react";
import cryptoSymbols from "./cryptoSymbols.json";

function Crypto() {
  const [extraCoins, setExtraCoins] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");

  const coins = React.useMemo(
    () => [
      ...cryptoSymbols.map((symbol) => ({ symbol })),
      ...extraCoins.map((symbol) => ({ symbol })),
    ],
    [extraCoins]
  );

  const handleAddCoin = (e) => {
    e.preventDefault();
    const trimmed = newSymbol.trim().toUpperCase();
    if (!trimmed) return;
    if (cryptoSymbols.includes(trimmed) || extraCoins.includes(trimmed)) {
      setNewSymbol("");
      return;
    }

    setExtraCoins((prev) => [...prev, trimmed]);
    setNewSymbol("");
  };

  return (
    <div className="stocks-page">
      <h1>Crypto Coins</h1>
      <div className="stocks-count">{coins.length} coins</div>
      <form className="stocks-add-form" onSubmit={handleAddCoin}>
        <input
          type="text"
          className="stocks-add-input"
          placeholder="Symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <button type="submit" className="stocks-add-btn">
          Add
        </button>
      </form>
      <div className="stocks-grid">
        {coins.map((item) => (
          <div key={item.symbol} className="stocks-tile">
            <span className="stocks-symbol">{item.symbol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crypto;
