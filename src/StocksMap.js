import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GEO_URL =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// Aliases to try when matching our country name against GeoJSON feature names.
// Each entry is a list of candidates tried in order.
const NAME_ALIASES = {
  USA: ["USA", "United States of America", "United States", "U.S.A."],
  "United Kingdom": ["United Kingdom", "UK", "Great Britain"],
  "South Korea": ["South Korea", "Republic of Korea", "Korea, South"],
  "North Korea": ["North Korea", "Korea, North", "Democratic People's Republic of Korea"],
  "South Africa": ["South Africa"],
  "United Arab Emirates": ["United Arab Emirates", "UAE"],
  "Hong Kong": ["Hong Kong", "Hong Kong S.A.R."],
  "New Zealand": ["New Zealand"],
  "Saudi Arabia": ["Saudi Arabia"],
  "Czech Republic": ["Czech Republic", "Czechia"],
  "Taiwan": ["Taiwan", "Taiwan, Province of China"],
};

// Build a resolver once GeoJSON is loaded: our country name → matched feature
function buildResolver(features) {
  // index features by name for fast lookup
  const byName = {};
  features.forEach((f) => {
    const n = f.properties.name;
    if (n) byName[n.toLowerCase()] = f;
  });

  return (country) => {
    // Try explicit aliases first
    const aliases = NAME_ALIASES[country] || [country];
    for (const alias of aliases) {
      const hit = byName[alias.toLowerCase()];
      if (hit) return hit;
    }
    // Fallback: substring match
    const lower = country.toLowerCase();
    for (const [key, feat] of Object.entries(byName)) {
      if (key.includes(lower) || lower.includes(key)) return feat;
    }
    return null;
  };
}

// For MultiPolygons, centroid of the whole shape can land in the ocean.
// Use the centroid of the largest polygon instead.
function bestCentroid(feature, path) {
  if (feature.geometry.type !== "MultiPolygon") {
    return path.centroid(feature);
  }
  let largest = null;
  let largestArea = -1;
  feature.geometry.coordinates.forEach((coords) => {
    const area = Math.abs(d3.polygonArea(coords[0]));
    if (area > largestArea) {
      largestArea = area;
      largest = coords;
    }
  });
  if (!largest) return path.centroid(feature);
  return path.centroid({
    type: "Feature",
    geometry: { type: "Polygon", coordinates: largest },
  });
}

function StocksMap({ countryOwnedCounts }) {
  const svgRef = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load map data");
        return r.json();
      })
      .then(setGeoData)
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const W = 960;
    const H = 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoNaturalEarth1()
      .scale(153)
      .translate([W / 2, H / 2]);

    const path = d3.geoPath().projection(projection);
    const resolve = buildResolver(geoData.features);

    // Build lookup: feature → owned count (accumulate so duplicate matches don't overwrite)
    const countByFeature = new Map();
    countryOwnedCounts.forEach(([country, { owned }]) => {
      const feature = resolve(country);
      if (feature) countByFeature.set(feature, (countByFeature.get(feature) || 0) + owned);
    });

    const maxCount = Math.max(...countByFeature.values(), 1);
    const colorScale = d3
      .scaleSequential()
      .domain([0, maxCount])
      .interpolator(d3.interpolate("#c7e9fb", "#0369a1"));

    // Draw countries
    svg
      .selectAll(".country-path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("class", "country-path")
      .attr("d", path)
      .attr("fill", (d) => {
        const count = countByFeature.get(d);
        return count ? colorScale(count) : "#e9ecef";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);

    // Labels
    countByFeature.forEach((owned, feature) => {
      const centroid = bestCentroid(feature, path);
      if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return;
      if (centroid[0] < 0 || centroid[0] > W || centroid[1] < 0 || centroid[1] > H) return;

      const fontSize = owned >= 100 ? 9 : owned >= 10 ? 10 : 11;

      svg
        .append("text")
        .attr("x", centroid[0])
        .attr("y", centroid[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", fontSize)
        .attr("font-weight", "700")
        .attr("fill", "#fff")
        .attr("pointer-events", "none")
        .attr("paint-order", "stroke")
        .attr("stroke", "rgba(0,0,0,0.3)")
        .attr("stroke-width", 2)
        .text(owned);
    });
  }, [geoData, countryOwnedCounts]);

  if (error) return null;

  return (
    <div className="stocks-map-container">
      {!geoData && <div className="stocks-map-loading">Loading map…</div>}
      <svg
        ref={svgRef}
        viewBox="0 0 960 500"
        preserveAspectRatio="xMidYMid meet"
        className="stocks-map-svg"
        style={{ display: geoData ? "block" : "none" }}
      />
    </div>
  );
}

export default StocksMap;
