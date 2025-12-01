import { useState } from 'react';
import './timehack.css';

function CharacterStats() {
  // Character stats - you can customize these
  const [stats] = useState({
    level: 30,
    health: 85,
    maxHealth: 100,
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
  const agePercentage = (stats.age / stats.maxAge) * 100;

  return (
    <div className="character-stats">
      <div className="character-header">
        <div className="character-avatar">
          <div className="avatar-circle">
            <span className="avatar-icon">⚡</span>
          </div>
          <div className="level-badge">Lv.{stats.level}</div>
        </div>
        <div className="character-info">
          <h3 className="character-name">Character</h3>
          <div className="xp-bar-container">
            <div className="xp-bar-label">Age: {stats.age} / {stats.maxAge}</div>
            <div className="xp-bar">
              <div 
                className="xp-bar-fill" 
                style={{ width: `${agePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {/* Health Bar */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">❤️</span> Health
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

        {/* Strength */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">💪</span> Strength
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${stats.strength}%`,
                backgroundColor: getStatColor(stats.strength)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.strength}/100</div>
        </div>

        {/* Intelligence */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">🧠</span> Intelligence
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${stats.intelligence}%`,
                backgroundColor: getStatColor(stats.intelligence)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.intelligence}/100</div>
        </div>

        {/* Charisma */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">✨</span> Charisma
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${stats.charisma}%`,
                backgroundColor: getStatColor(stats.charisma)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.charisma}/100</div>
        </div>

        {/* Fitness */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">🏃</span> Fitness
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${stats.fitness}%`,
                backgroundColor: getStatColor(stats.fitness)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.fitness}/100</div>
        </div>

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

        {/* Skills */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">🎯</span> Skills
          </div>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${stats.skills}%`,
                backgroundColor: getStatColor(stats.skills)
              }}
            ></div>
          </div>
          <div className="stat-value">{stats.skills}/100</div>
        </div>
      </div>
    </div>
  );
}

export default CharacterStats;

