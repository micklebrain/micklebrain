import React, { useState, useMemo } from "react";
import cryptoSymbols from "./cryptoSymbols.json";

function Crypto() {
  const [extraCoins, setExtraCoins] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [showAllOwnedOnly, setShowAllOwnedOnly] = useState(false);
  const [showNotOwnedOnly, setShowNotOwnedOnly] = useState(false);
  const [showRobinhoodOnly, setShowRobinhoodOnly] = useState(false);
  const [showGeminiOnly, setShowGeminiOnly] = useState(false);
  const [showCoinbaseOnly, setShowCoinbaseOnly] = useState(false);

  const coins = useMemo(
    () => [
      ...cryptoSymbols,
      ...extraCoins,
    ],
    [extraCoins]
  );

  const filteredCoins = useMemo(() => {
    if (showRobinhoodOnly) {
      return coins.filter((coin) => coin.ownRobinhood);
    }

    if (showGeminiOnly) {
      return coins.filter((coin) => coin.ownGemini);
    }

    if (showCoinbaseOnly) {
      return coins.filter((coin) => coin.ownCoinbase);
    }

    if (showAllOwnedOnly) {
      return coins.filter(
        (coin) => coin.ownRobinhood || coin.ownGemini || coin.ownCoinbase
      );
    }

    if (showNotOwnedOnly) {
      return coins.filter(
        (coin) => !coin.ownRobinhood && !coin.ownGemini && !coin.ownCoinbase
      );
    }

    return coins;
  }, [coins, showAllOwnedOnly, showNotOwnedOnly, showRobinhoodOnly, showGeminiOnly]);

  const clearCryptoFilters = () => {
    setShowAllOwnedOnly(false);
    setShowNotOwnedOnly(false);
    setShowRobinhoodOnly(false);
    setShowGeminiOnly(false);
    setShowCoinbaseOnly(false);
  };

  const toggleAllOwnedFilter = () => {
    setShowNotOwnedOnly(false);
    setShowRobinhoodOnly(false);
    setShowGeminiOnly(false);
    setShowCoinbaseOnly(false);
    setShowAllOwnedOnly((prev) => !prev);
  };

  const toggleNotOwnedFilter = () => {
    setShowAllOwnedOnly(false);
    setShowRobinhoodOnly(false);
    setShowGeminiOnly(false);
    setShowCoinbaseOnly(false);
    setShowNotOwnedOnly((prev) => !prev);
  };

  const toggleRobinhoodFilter = () => {
    setShowAllOwnedOnly(false);
    setShowNotOwnedOnly(false);
    setShowGeminiOnly(false);
    setShowCoinbaseOnly(false);
    setShowRobinhoodOnly((prev) => !prev);
  };

  const toggleGeminiFilter = () => {
    setShowAllOwnedOnly(false);
    setShowNotOwnedOnly(false);
    setShowRobinhoodOnly(false);
    setShowCoinbaseOnly(false);
    setShowGeminiOnly((prev) => !prev);
  };

  const toggleCoinbaseFilter = () => {
    setShowAllOwnedOnly(false);
    setShowNotOwnedOnly(false);
    setShowRobinhoodOnly(false);
    setShowGeminiOnly(false);
    setShowCoinbaseOnly((prev) => !prev);
  };

  const handleAddCoin = (e) => {
    e.preventDefault();
    const trimmed = newSymbol.trim().toUpperCase();
    if (!trimmed) return;
    if (
      cryptoSymbols.some((coin) => coin.Symbol === trimmed) ||
      extraCoins.some((coin) => coin.Symbol === trimmed)
    ) {
      setNewSymbol("");
      return;
    }

    setExtraCoins((prev) => [
      ...prev,
      {
        Symbol: trimmed,
        Name: "",
        ownRobinhood: false,
        ownGemini: false,
        ownCoinbase: false,
      },
    ]);
    setNewSymbol("");
  };

  const noFilterActive = !showAllOwnedOnly && !showNotOwnedOnly && !showRobinhoodOnly && !showGeminiOnly && !showCoinbaseOnly;

  return (
    <div className="stocks-page">
      <h1>Crypto Coins</h1>
      <div className="stocks-filters">
        <button
          type="button"
          className={`stocks-filter-btn ${noFilterActive ? "active" : ""}`}
          onClick={clearCryptoFilters}
        >
          All
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${showRobinhoodOnly ? "active" : ""}`}
          onClick={toggleRobinhoodFilter}
        >
          Robinhood
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${showGeminiOnly ? "active" : ""}`}
          onClick={toggleGeminiFilter}
        >
          Gemini
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${showCoinbaseOnly ? "active" : ""}`}
          onClick={toggleCoinbaseFilter}
        >
          Coinbase
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${showAllOwnedOnly ? "active" : ""}`}
          onClick={toggleAllOwnedFilter}
        >
          All Owned
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${showNotOwnedOnly ? "active" : ""}`}
          onClick={toggleNotOwnedFilter}
        >
          Not Owned
        </button>
      </div>
      <div className="stocks-count">{filteredCoins.length} coins</div>
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
        {filteredCoins.map((item) => (
          <div key={item.Symbol} className="stocks-tile">
            <span className="stocks-symbol">{item.Symbol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crypto;
