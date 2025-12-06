import { useState } from 'react';
import './timehack.css';

function CharacterStats() {
  // Character stats - you can customize these
  const [stats] = useState({
    level: 30,
    health: 140,
    maxHealth: 150,
    righthandcurl: 20,
    maxrighthandcurl: 50,
    lefthandcurl: 20,
    maxlefthandcurl: 50,
    strength: 72,
    intelligence: 88,
    charisma: 65,
    fitness: 78,
    wealth: 450000,
    maxWealth: 1000000,
    skills: 92,
    age: 30,
    maxAge: 120
  });

  const getStatColor = (stat) => {
    if (stat >= 80) return '#4ade80'; // Green for high
    if (stat >= 60) return '#fbbf24'; // Yellow for medium
    return '#f87171'; // Red for low
  };

  const getHealthColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 70) return '#4ade80';
    if (percentage >= 40) return '#fbbf24';
    return '#f87171';
  };

  const healthPercentage = (stats.health / stats.maxHealth) * 100;
  const righthandcurlPercentage = (stats.righthandcurl / stats.maxrighthandcurl) * 100;
  const lefthandcurlPercentage = (stats.lefthandcurl / stats.maxlefthandcurl) * 100;

  return (
    <div className="character-stats">
      <div className="character-header">
        <div className="character-avatar">
          <div className="avatar-circle">
            <span className="avatar-icon">⚡</span>
          </div>
          <div className="level-badge">Lv.{stats.level}</div>
        </div>
      </div>

      <div className="stats-grid">
              {/* Wealth */}
              <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">💰</span> Wealth
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${(stats.wealth / stats.maxWealth) * 100}%`,
                backgroundColor: getStatColor((stats.wealth / stats.maxWealth) * 100)
              }}
            ></div>
          </div>
          <div className="stat-value">${stats.wealth.toLocaleString()}</div>
        </div>

        {/* Health Bar */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">🫃</span> Weight
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${healthPercentage}%`,
                backgroundColor: getHealthColor(stats.health, stats.maxHealth)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.health} / {stats.maxHealth}</div>
        </div>

        {/* Health Bar */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">💪</span> right hand curl
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${righthandcurlPercentage}%`,
                backgroundColor: getHealthColor(stats.righthandcurl, stats.maxrighthandcurl)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.righthandcurl} / {stats.maxrighthandcurl}</div>
        </div>

        {/* Left hand curl */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">💪</span> left hand curl
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${lefthandcurlPercentage}%`,
                backgroundColor: getHealthColor(stats.lefthandcurl, stats.maxlefthandcurl)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.lefthandcurl} / {stats.maxlefthandcurl}</div>
        </div>

      </div>
    </div>
  );
}

export default CharacterStats;
