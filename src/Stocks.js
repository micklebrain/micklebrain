import React, { useState } from "react";
import { Link } from "react-router-dom";
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

    return stocksData.filter(
      (item) => item && typeof item.Symbol === "string" && item.Symbol.length > 0
    );
  }, []);

  const [selectedBrokers, setSelectedBrokers] = useState({
    webull: false,
    etrade: false,
    robinhood: false,
    chase: false,
    schwab: false,
    ally: false,
    fidelity: false,
    interactiveBrokers: false,
    moomoo: false,
  });
  const [showAllOwnedOnly, setShowAllOwnedOnly] = useState(false);
  const [showNotOwnedOnly, setShowNotOwnedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showDividendOnly, setShowDividendOnly] = useState(false);
  const [showETFOnly, setShowETFOnly] = useState(false);
  const [extraStocks, setExtraStocks] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [newOwnWebull, setNewOwnWebull] = useState(false);
  const [newOwnEtrade, setNewOwnEtrade] = useState(false);
  const [newOwnRobinhood, setNewOwnRobinhood] = useState(false);
  const [newOwnChase, setNewOwnChase] = useState(false);
  const [newOwnSchwab, setNewOwnSchwab] = useState(false);
  const [newOwnAlly, setNewOwnAlly] = useState(false);
  const [newOwnFidelity, setNewOwnFidelity] = useState(false);
  const [newOwnInteractiveBrokers, setNewOwnInteractiveBrokers] = useState(false);
  const [newOwnMoomoo, setNewOwnMoomoo] = useState(false);

  const effectiveItems = React.useMemo(
    () => [...items, ...extraStocks],
    [items, extraStocks]
  );

  const countries = React.useMemo(() => {
    const set = new Set();
    effectiveItems.forEach((item) => {
      if (item.Country) set.add(item.Country);
    });
    return [...set].sort();
  }, [effectiveItems]);

  const countryOwnedCounts = React.useMemo(() => {
    const counts = {};
    effectiveItems.forEach((item) => {
      const country = item.Country || "Unknown";
      const owned =
        !!item.ownWebull ||
        !!item.ownEtrade ||
        !!item.ownRobinhood ||
        !!item.ownChase ||
        !!item.ownSchwab ||
        !!item.ownAlly ||
        !!item.ownFidelity ||
        !!item.ownInteractiveBrokers ||
        !!item.ownMoomoo;
      if (!counts[country]) counts[country] = { total: 0, owned: 0 };
      counts[country].total += 1;
      if (owned) counts[country].owned += 1;
    });
    return Object.entries(counts)
      .filter(([, v]) => v.owned > 0)
      .sort((a, b) => b[1].owned - a[1].owned);
  }, [effectiveItems]);

  const brokerToOwnershipField = {
    webull: "ownWebull",
    etrade: "ownEtrade",
    robinhood: "ownRobinhood",
    chase: "ownChase",
    schwab: "ownSchwab",
    ally: "ownAlly",
    fidelity: "ownFidelity",
    interactiveBrokers: "ownInteractiveBrokers",
    moomoo: "ownMoomoo",
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
      !!item.ownFidelity ||
      !!item.ownInteractiveBrokers;
      // note: ownMoomoo intentionally not included here earlier; include now
      // (will be added below)

    // include moomoo in overall owned check
    const ownedInAny = isOwnedInAnyBroker || !!item.ownMoomoo;

    if (selectedCountry && item.Country !== selectedCountry) return false;
    if (showDividendOnly && !item.dividend) return false;
    if (showETFOnly && item.ETF !== "Y") return false;
    if (showAllOwnedOnly) return ownedInAny;
    if (showNotOwnedOnly) return !ownedInAny;
    if (!hasAnyBrokerFilter) return true;
    return activeBrokers.every((broker) => !!item[brokerToOwnershipField[broker]]);
  });

  const symbolOccurrences = React.useMemo(() => {
    const counts = {};
    return filteredItems.map((item) => {
      const symbol = item && item.Symbol;
      const occurrence = counts[symbol] ?? 0;
      counts[symbol] = occurrence + 1;
      return occurrence;
    });
  }, [filteredItems]);

  const clearBrokerFilters = () => {
    setSelectedBrokers({
      webull: false,
      etrade: false,
      robinhood: false,
      chase: false,
      schwab: false,
      ally: false,
      fidelity: false,
      interactiveBrokers: false,
      moomoo: false,
    });
    setSelectedCountry("");
    setShowAllOwnedOnly(false);
    setShowNotOwnedOnly(false);
    setShowDividendOnly(false);
    setShowETFOnly(false);
  };

  const toggleBrokerFilter = (broker) => {
    setShowAllOwnedOnly(false);
    setShowNotOwnedOnly(false);
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
      interactiveBrokers: false,
      moomoo: false,
    });
    setShowNotOwnedOnly(false);
    setShowAllOwnedOnly((prev) => !prev);
  };

  const toggleNotOwnedFilter = () => {
    setSelectedBrokers({
      webull: false,
      etrade: false,
      robinhood: false,
      chase: false,
      schwab: false,
      ally: false,
      fidelity: false,
      interactiveBrokers: false,
      moomoo: false,
    });
    setShowAllOwnedOnly(false);
    setShowNotOwnedOnly((prev) => !prev);
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const trimmed = newSymbol.trim().toUpperCase();
    if (!trimmed) return;

    setExtraStocks((prev) => [
      ...prev,
      {
        Symbol: trimmed,
        ownWebull: newOwnWebull,
        ownEtrade: newOwnEtrade,
        ownRobinhood: newOwnRobinhood,
        ownInteractiveBrokers: newOwnInteractiveBrokers,
        ownChase: newOwnChase,
        ownSchwab: newOwnSchwab,
        ownAlly: newOwnAlly,
        ownFidelity: newOwnFidelity,
        ownMoomoo: newOwnMoomoo,
      },
    ]);

    setNewSymbol("");
    setNewOwnWebull(false);
    setNewOwnEtrade(false);
    setNewOwnRobinhood(false);
    setNewOwnInteractiveBrokers(false);
    setNewOwnChase(false);
    setNewOwnSchwab(false);
    setNewOwnAlly(false);
    setNewOwnFidelity(false);
    setNewOwnMoomoo(false);
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
        <label className="stocks-filter-select">
          <span>Country</span>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
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
          className={`stocks-filter-btn ${selectedBrokers.interactiveBrokers ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("interactiveBrokers")}
        >
          Interactive Brokers
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
          className={`stocks-filter-btn ${selectedBrokers.moomoo ? "active" : ""}`}
          onClick={() => toggleBrokerFilter("moomoo")}
        >
          Moomoo
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
        <button
          type="button"
          className={`stocks-filter-btn ${showDividendOnly ? "active" : ""}`}
          onClick={() => setShowDividendOnly((prev) => !prev)}
        >
          Dividend
        </button>
        <button
          type="button"
          className={`stocks-filter-btn ${showETFOnly ? "active" : ""}`}
          onClick={() => setShowETFOnly((prev) => !prev)}
        >
          ETF
        </button>
      </div>
      <div className="stocks-count">
        {filteredItems.length} stocks
      </div>
      {countryOwnedCounts.length > 0 && (
        <div className="stocks-country-counts">
          {countryOwnedCounts.map(([country, { owned }]) => (
            <span key={country} className="stocks-country-count-item">
              <span className="stocks-country-count-name">{country}</span>
              <span className="stocks-country-count-num">{owned}</span>
            </span>
          ))}
        </div>
      )}
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
            checked={newOwnInteractiveBrokers}
            onChange={(e) => setNewOwnInteractiveBrokers(e.target.checked)}
          />
          Interactive Brokers
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
        <label className="stocks-add-checkbox">
          <input
            type="checkbox"
            checked={newOwnMoomoo}
            onChange={(e) => setNewOwnMoomoo(e.target.checked)}
          />
          Moomoo
        </label>
        <button type="submit" className="stocks-add-btn">
          Add
        </button>
      </form>
      <div className="stocks-grid">
        {filteredItems.map((item, index) => {
          const occurrence = symbolOccurrences[index];
          const globalIndex = effectiveItems.findIndex((x) => x === item);
          const hasWebull = !!item.ownWebull;
          const hasEtrade = !!item.ownEtrade;
          const hasRobinhood = !!item.ownRobinhood;
          const hasChase = !!item.ownChase;
          const hasSchwab = !!item.ownSchwab;
          const hasAlly = !!item.ownAlly;
          const hasFidelity = !!item.ownFidelity;
          const hasInteractiveBrokers = !!item.ownInteractiveBrokers;
          const hasMoomoo = !!item.ownMoomoo;
          const isOwned =
            hasWebull ||
            hasEtrade ||
            hasRobinhood ||
            hasInteractiveBrokers ||
            hasChase ||
            hasSchwab ||
            hasAlly ||
            hasFidelity ||
            hasMoomoo;

          return (
            <div
              key={`${item.Symbol}-${globalIndex}`}
              className={`stocks-tile ${isOwned ? "stocks-tile-owned" : ""}`}
            >
              <span className="stocks-symbol">
                <Link to={`/stocks/${encodeURIComponent(item.Symbol)}/${globalIndex}`}>
                  {item.Symbol}
                </Link>
              </span>
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
              {hasInteractiveBrokers && (
                <span className="stocks-tile-ibkr-badge">IBKR</span>
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
                  {hasMoomoo && (
                    <span className="stocks-tile-moomoo-badge">MOO</span>
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stocks;
