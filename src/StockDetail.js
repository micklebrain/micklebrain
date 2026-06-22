import React from "react";
import { useParams, Link } from "react-router-dom";
import stocksData from "./stocks.json";

function StockDetail() {
  const { symbol, itemIndex } = useParams();
  const normalizedSymbol = (symbol || "").toUpperCase();
  const stocks = Array.isArray(stocksData) ? stocksData : [];

  const matches = stocks.filter(
    (item) =>
      item &&
      typeof item.Symbol === "string" &&
      item.Symbol.toUpperCase() === normalizedSymbol
  );

  let selectedItem = null;
  if (typeof itemIndex !== "undefined") {
    const index = Number(itemIndex);
    if (!Number.isNaN(index) && index >= 0 && index < stocks.length) {
      const candidate = stocks[index];
      if (candidate && typeof candidate.Symbol === "string" && candidate.Symbol.toUpperCase() === normalizedSymbol) {
        selectedItem = candidate;
      } else if (index >= 0 && index < matches.length) {
        // Fallback for older links that used match-local index
        selectedItem = matches[index];
      }
    }
  }

  const renderOwnedIn = (item) => {
    const owners = [];
    if (item.ownWebull) owners.push("Webull");
    if (item.ownEtrade) owners.push("E*TRADE");
    if (item.ownRobinhood) owners.push("Robinhood");
    if (item.ownInteractiveBrokers) owners.push("Interactive Brokers");
    if (item.ownChase) owners.push("Chase");
    if (item.ownSchwab) owners.push("Schwab");
    if (item.ownAlly) owners.push("Ally");
    if (item.ownFidelity) owners.push("Fidelity");
    return owners.length > 0 ? owners.join(", ") : null;
  };

  return (
    <div className="stock-detail-page">
      <h1>Stock details</h1>
      <p className="stock-detail-symbol">
        {normalizedSymbol || "Unknown"}
      </p>

      {matches.length === 0 ? (
        <div className="stock-detail-empty">
          No stock found for symbol {normalizedSymbol}.
        </div>
      ) : selectedItem ? (
        <div className="stock-detail-list">
          <div className="stock-detail-card">
            <p>
              <strong>Name:</strong> {selectedItem.Name || selectedItem["Security Name"] || "Unnamed Stock"}
            </p>
            {(selectedItem.Country || selectedItem.country) && (
              <p>
                <strong>Country:</strong> {selectedItem.Country || selectedItem.country}
              </p>
            )}
            {renderOwnedIn(selectedItem) && (
              <p>
                <strong>Owned in:</strong> {renderOwnedIn(selectedItem)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="stock-detail-list">
          {matches.map((item, index) => {
            const ownedIn = renderOwnedIn(item);
            const globalIndex = stocks.findIndex((x) => x === item);
            return (
              <div
                key={`${normalizedSymbol}-${globalIndex}`}
                className="stock-detail-card"
              >
                <h2>{item.Name || item["Security Name"] || "Unnamed Stock"}</h2>
                <p>
                  <Link to={`/stocks/${encodeURIComponent(item.Symbol)}/${globalIndex}`}>
                    View this item
                  </Link>
                </p>
                {ownedIn && (
                  <p>
                    <strong>Owned in:</strong> {ownedIn}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="stock-detail-back">
        <Link to="/stocks">← Back to stocks</Link>
      </div>
    </div>
  );
}

export default StockDetail;
