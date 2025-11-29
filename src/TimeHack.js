import { useEffect, useState } from "react";
import "./timehack.css";
import glassSkin from './images/glassskin.png';

function TimeHack() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedHour, setExpandedHour] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const currentHour = currentTime.getHours();

  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const todayKey = formatDateKey(currentTime);
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow);

  const dailyTasks = {
    0: "sleep",
    1: "sleep",
    2: "sleep",
    3: "sleep",
    4: "sleep",
    5: "sleep",
    6: "sleep",
    7: "sleep",
    8: `selfcare
        skincare`,
    9: "stretch, try to perform split",
    10: "call mom",
    11: "trade/learn stocks",
    12: `cook/eat lunch
         consume protein`,
    13: `learn a language
        answer 10 sample questions
        learn 10 kanji: 天 石 天 生 入 出 高 安 新 古`,
    14: "work on music - piano track",
    15: "film/edit video for YouTube",
    16: `workout
        lift dumbells
        go running`,
    17: "clear photos on Macbook (34 GB) and SSD drive (300 GB)",
    18: "cook/eat dinner",
    19: "learn to shoot guns",
    20: "find reference photos from Instagram or Tiktok",
    21: `work on personal site`,
    22: `selfcare
         skincare
         scrap tongue`,
    23: "learn to do backflip",
  };

  const higherMissions = {
    0: "Restore energy for tomorrow",
    1: "Restore energy for tomorrow",
    2: "Restore energy for tomorrow",
    3: "Restore energy for tomorrow",
    4: "Restore energy for tomorrow",
    5: "Restore energy for tomorrow",
    6: "Restore energy for tomorrow",
    7: "Restore energy for tomorrow",
    8: { text: "achieve glass skin", image: glassSkin, alt: "Glass skin example" },
    9: "Increase flexibility and body control",
    10: "Build an optimized life schedule",
    11: "Become knowledgeable about stocks",
    12: "Fuel body for peak performance",
    13: "Become trilingual + improve memory",
    14: "Create long-term music skills & portfolio",
    15: "Grow YouTube channel + digital presence",
    16: "Build elite-level fitness",
    17: "Organize digital life",
    18: "Maintain strong evening nutrition habits",
    19: "Become fluent in Korean",
    20: "polish social media",
    21: "Build online presence + personal branding",
    22: "Maintain healthy, clean appearance",
    23: "Achieve a standing backflip",
  };
  
  const datedTasks = {
    "2025-11-28": { 11: "go Black Friday shopping at Citadel Outlets" },
  };

  const hours = [...Array(24).keys()];
  const sortedHours = [...hours.slice(currentHour), ...hours.slice(0, currentHour)];
  const minuteProgress = (currentTime.getMinutes() / 60) * 100;

  const toggleExpand = (hour) => {
    setExpandedHour(prev => prev === hour ? null : hour);
  };

  return (
    <div className="timehack">
      <h1>TimeHack</h1>
      <div className="hours-list">
        {sortedHours.map((hour) => {
          const isCurrentHour = hour === currentHour;
          const dateKey = hour >= currentHour ? todayKey : tomorrowKey;
          const task = datedTasks[dateKey]?.[hour] || dailyTasks[hour] || "No task assigned";
          const mission = higherMissions[hour];

          const isSleepTask = task === "sleep";
          
          return (
            <div 
              key={`${hour}-${dateKey}`} 
              className={`hour-block ${isCurrentHour ? "current-hour" : ""} ${isSleepTask ? "sleep-task" : ""}`}
            >
              {/* Clickable wrapper */}
              <div
                className="hour-row"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleExpand(hour);
                }}
                style={{ 
                  cursor: "pointer", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isSleepTask ? "rgba(0, 0, 0, 0.05)" : "rgba(10, 165, 255, 0.05)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <div className="hour-left">
                  <div className="hour-label">{hour}:00</div>
                  <div className="task" style={{ whiteSpace: "pre-line" }}>{task}</div>
                </div>
                {expandedHour === hour ? "▼" : "▶"}
              </div>

              {/* Higher mission only visible when clicked */}
              {expandedHour === hour && mission && (
                <div className="higher-mission" style={{ marginTop: "6px", padding: "6px 12px", background: "#eef9ff", borderRadius: "6px" }}>
                  <strong>Higher Mission:</strong>{" "}
                  {typeof mission === "string" ? (
                    <span>{mission}</span>
                  ) : (
                    <>
                      <span>{mission.text}</span>
                      {mission.image && (
                        <img 
                          src={mission.image} 
                          alt={mission.alt || "Mission visual"} 
                          className="mission-image"
                        />
                      )}
                    </>
                  )}
                </div>
              )}

              {isCurrentHour && (
                <div className="hour-progress">
                  <div className="hour-progress-fill" style={{ width: `${minuteProgress}%` }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeHack;
