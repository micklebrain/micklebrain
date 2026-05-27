import React from "react";
import cryptoSymbols from "./cryptoSymbols.json";

function CryptoJson() {
  return (
    <div className="stocks-page">
      <h1>Crypto Symbols JSON</h1>
      <div className="stocks-count">{cryptoSymbols.length} symbols</div>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#f3f4f6", padding: "16px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        {JSON.stringify(cryptoSymbols, null, 2)}
      </pre>
    </div>
  );
}

export default CryptoJson;
