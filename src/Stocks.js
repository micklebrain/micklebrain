import React, { useState } from "react";
import stocksData from "./stocks.json";
import webullLogo from "./webull.svg";
import etradeLogo from "./etrade.svg";
import robinhoodLogo from "./robinhood.svg";
import chaseLogo from "./chase.svg";
import schwabLogo from "./schwab.svg";
import allyLogo from "./ally.svg";
import fidelityLogo from "./fidelity.svg";

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
        ownRobinhood: false,
        ownChase: false,
        ownSchwab: false,
        ownAlly: false,
        ownFidelity: false,
      };

      bySymbol.set(symbol, {
        Symbol: symbol,
        ownWebull: existing.ownWebull || !!item.ownWebull,
        ownEtrade: existing.ownEtrade || !!item.ownEtrade,
        ownRobinhood: existing.ownRobinhood || !!item.ownRobinhood,
        ownChase: existing.ownChase || !!item.ownChase,
        ownSchwab: existing.ownSchwab || !!item.ownSchwab,
        ownAlly: existing.ownAlly || !!item.ownAlly,
        ownFidelity: existing.ownFidelity || !!item.ownFidelity,
      });
    });

    return Array.from(bySymbol.values());
  }, []);

  const [selectedBrokers, setSelectedBrokers] = useState({
    webull: false,
    etrade: false,
    robinhood: false,
    chase: false,
    schwab: false,
    ally: false,
    fidelity: false,
  });
  const [showAllOwnedOnly, setShowAllOwnedOnly] = useState(false);
  const [extraStocks, setExtraStocks] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [newOwnWebull, setNewOwnWebull] = useState(false);
  const [newOwnEtrade, setNewOwnEtrade] = useState(false);
  const [newOwnRobinhood, setNewOwnRobinhood] = useState(false);
  const [newOwnChase, setNewOwnChase] = useState(false);
  const [newOwnSchwab, setNewOwnSchwab] = useState(false);
  const [newOwnAlly, setNewOwnAlly] = useState(false);
  const [newOwnFidelity, setNewOwnFidelity] = useState(false);

  const effectiveItems = React.useMemo(
    () => [...items, ...extraStocks],
    [items, extraStocks]
  );

  const brokerToOwnershipField = {
    webull: "ownWebull",
    etrade: "ownEtrade",
    robinhood: "ownRobinhood",
    chase: "ownChase",
    schwab: "ownSchwab",
    ally: "ownAlly",
    fidelity: "ownFidelity",
  };

  const activeBrokers = Object.keys(selectedBrokers).filter(
    (broker) => selectedBrokers[broker]
  );
  const hasAnyBrokerFilter = activeBrokers.length > 0;

  const filteredItems = effectiveItems.filter((item) => {
    const isOwnedInAnyBroker =
      !!item.ownWebull ||
      !!item.ownEtrade ||
      !!item.ownRobinhood ||
      !!item.ownChase ||
      !!item.ownSchwab ||
      !!item.ownAlly ||
      !!item.ownFidelity;

    if (showAllOwnedOnly) return isOwnedInAnyBroker;
    if (!hasAnyBrokerFilter) return true;
    return activeBrokers.every((broker) => !!item[brokerToOwnershipField[broker]]);
  });

  const clearBrokerFilters = () => {
    setSelectedBrokers({
      webull: false,
      etrade: false,
      robinhood: false,
      chase: false,
      schwab: false,
      ally: false,
      fidelity: false,
    });
    setShowAllOwnedOnly(false);
  };

  const toggleBrokerFilter = (broker) => {
    setShowAllOwnedOnly(false);
    setSelectedBrokers((prev) => ({
      ...prev,
      [broker]: !prev[broker],
    }));
  };

  const toggleAllOwnedFilter = () => {
    setSelectedBrokers({
      webull: false,
      etrade: false,
      robinhood: false,
      chase: false,
      schwab: false,
      ally: false,
      fidelity: false,
    });
    setShowAllOwnedOnly((prev) => !prev);
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const trimmed = newSymbol.trim().toUpperCase();
    if (!trimmed) return;

    // Avoid adding duplicates (by symbol) to the extra list
    if (extraStocks.some((s) => s.Symbol === trimmed)) {
      setNewSymbol("");
      setNewOwnWebull(false);
      setNewOwnEtrade(false);
      setNewOwnRobinhood(false);
      setNewOwnChase(false);
      setNewOwnSchwab(false);
      setNewOwnAlly(false);
      setNewOwnFidelity(false);
      return;
    }

    setExtraStocks((prev) => [
      ...prev,
      {
        Symbol: trimmed,
        ownWebull: newOwnWebull,
        ownEtrade: newOwnEtrade,
        ownRobinhood: newOwnRobinhood,
        ownChase: newOwnChase,
        ownSchwab: newOwnSchwab,
        ownAlly: newOwnAlly,
        ownFidelity: newOwnFidelity,
      },
    ]);

    setNewSymbol("");
    setNewOwnWebull(false);
    setNewOwnEtrade(false);
    setNewOwnRobinhood(false);
    setNewOwnChase(false);
    setNewOwnSchwab(false);
    setNewOwnAlly(false);
    setNewOwnFidelity(false);
  };

  return (
    <div className="stocks-page">
      <h1>Stocks</h1>
      <div className="stocks-filters">
        <button
          type="button"
          className={`stocks-filter-btn ${!hasAnyBrokerFilter && !showAllOwnedOnly ? "active" : ""}`}
          onClick={clearBrokerFilters}
        >
          All
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${selectedBrokers.webull ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("webull")}
        >
          Webull
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${selectedBrokers.etrade ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("etrade")}
        >
          E*TRADE
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${selectedBrokers.robinhood ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("robinhood")}
        >
          Robinhood
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${selectedBrokers.chase ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("chase")}
        >
          Chase
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${selectedBrokers.schwab ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("schwab")}
        >
          Schwab
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${selectedBrokers.ally ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("ally")}
        >
          Ally
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${selectedBrokers.fidelity ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("fidelity")}
        >
          Fidelity
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${showAllOwnedOnly ? "active" : ""}`}
          onClick={toggleAllOwnedFilter}
        >
          All Owned
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
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnRobinhood}
            onChange={(e) => setNewOwnRobinhood(e.target.checked)}
          />
          Robinhood
        </label>
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnChase}
            onChange={(e) => setNewOwnChase(e.target.checked)}
          />
          Chase
        </label>
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnSchwab}
            onChange={(e) => setNewOwnSchwab(e.target.checked)}
          />
          Schwab
        </label>
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnAlly}
            onChange={(e) => setNewOwnAlly(e.target.checked)}
          />
          Ally
        </label>
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnFidelity}
            onChange={(e) => setNewOwnFidelity(e.target.checked)}
          />
          Fidelity
        </label>
        <button type="submit" className="stocks-add-btn">
          Add
        </button>
      </form>
      <div className="stocks-grid">
        {filteredItems.map((item) => {
          const hasWebull = !!item.ownWebull;
          const hasEtrade = !!item.ownEtrade;
          const hasRobinhood = !!item.ownRobinhood;
          const hasChase = !!item.ownChase;
          const hasSchwab = !!item.ownSchwab;
          const hasAlly = !!item.ownAlly;
          const hasFidelity = !!item.ownFidelity;
          const isOwned =
            hasWebull ||
            hasEtrade ||
            hasRobinhood ||
            hasChase ||
            hasSchwab ||
            hasAlly ||
            hasFidelity;

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
              {hasRobinhood && (
                <img
                  src={robinhoodLogo}
                  alt="Owned in Robinhood"
                  className="stocks-tile-robinhood-icon"
                />
              )}
              {hasChase && (
                <img
                  src={chaseLogo}
                  alt="Owned in Chase"
                  className="stocks-tile-chase-icon"
                />
              )}
              {hasSchwab && (
                <img
                  src={schwabLogo}
                  alt="Owned in Charles Schwab"
                  className="stocks-tile-schwab-icon"
                />
              )}
              {hasAlly && (
                <img
                  src={allyLogo}
                  alt="Owned in Ally"
                  className="stocks-tile-ally-icon"
                />
              )}
              {hasFidelity && (
                <img
                  src={fidelityLogo}
                  alt="Owned in Fidelity"
                  className="stocks-tile-fidelity-icon"
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
