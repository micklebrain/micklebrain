import React, { useState } from "react";
import stocksData from "./stocks.json";
import webullLogo from "./webull.svg";
import etradeLogo from "./etrade.svg";

function Stocks() {
  const items = React.useMemo(() => {
    if (!Array.isArray(stocksData)) return [];

    const bySymbol = new Map();

    stocksData.forEach((item) => {
      if (!item || typeof item.Symbol !== "string" || item.Symbol.length === 0) {
        return;
      }
      const symbol = item.Symbol;
      const existing = bySymbol.get(symbol) || {
        Symbol: symbol,
        ownWebull: false,
        ownEtrade: false,
      };

      bySymbol.set(symbol, {
        Symbol: symbol,
        ownWebull: existing.ownWebull || !!item.ownWebull,
        ownEtrade: existing.ownEtrade || !!item.ownEtrade,
      });
    });

    return Array.from(bySymbol.values());
  }, []);

  const [filter, setFilter] = useState("all"); // all | webull | etrade
  const [extraStocks, setExtraStocks] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [newOwnWebull, setNewOwnWebull] = useState(false);
  const [newOwnEtrade, setNewOwnEtrade] = useState(false);

  const effectiveItems = React.useMemo(
    () => [...items, ...extraStocks],
    [items, extraStocks]
  );

  const filteredItems = effectiveItems.filter((item) => {
    if (filter === "webull") return !!item.ownWebull;
    if (filter === "etrade") return !!item.ownEtrade;
    return true;
  });

  const handleAddStock = (e) => {
    e.preventDefault();
    const trimmed = newSymbol.trim().toUpperCase();
    if (!trimmed) return;

    // Avoid adding duplicates (by symbol) to the extra list
    if (extraStocks.some((s) => s.Symbol === trimmed)) {
      setNewSymbol("");
      setNewOwnWebull(false);
      setNewOwnEtrade(false);
      return;
    }

    setExtraStocks((prev) => [
      ...prev,
      {
        Symbol: trimmed,
        ownWebull: newOwnWebull,
        ownEtrade: newOwnEtrade,
      },
    ]);

    setNewSymbol("");
    setNewOwnWebull(false);
    setNewOwnEtrade(false);
  };

  return (
    <div className="stocks-page">
      <h1>Stocks</h1>
      <div className="stocks-filters">
        <button
          type="button"
          className={`stocks-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${filter === "webull" ? "active" : ""}`}
          onClick={() => setFilter("webull")}
        >
          Webull
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${filter === "etrade" ? "active" : ""}`}
          onClick={() => setFilter("etrade")}
        >
          E*TRADE
        </button>
      </div>
      <div className="stocks-count">
        {filteredItems.length} stocks
      </div>
      <form className="stocks-add-form" onSubmit={handleAddStock}>
        <input
          type="text"
          className="stocks-add-input"
          placeholder="Symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnWebull}
            onChange={(e) => setNewOwnWebull(e.target.checked)}
          />
          Webull
        </label>
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnEtrade}
            onChange={(e) => setNewOwnEtrade(e.target.checked)}
          />
          E*TRADE
        </label>
        <button type="submit" className="stocks-add-btn">
          Add
        </button>
      </form>
      <div className="stocks-grid">
        {filteredItems.map((item) => {
          const hasWebull = !!item.ownWebull;
          const hasEtrade = !!item.ownEtrade;
          const isOwned = hasWebull || hasEtrade;

          return (
            <div
              key={item.Symbol}
              className={`stocks-tile ${isOwned ? "stocks-tile-owned" : ""}`}
            >
              <span className="stocks-symbol">{item.Symbol}</span>
              {hasWebull && (
                <img
                  src={webullLogo}
                  alt="Owned in Webull"
                  className="stocks-tile-webull-icon"
                />
              )}
              {hasEtrade && (
                <img
                  src={etradeLogo}
                  alt="Owned in E*TRADE"
                  className="stocks-tile-etrade-icon"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stocks;
