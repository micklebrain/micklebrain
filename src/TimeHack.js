import { useEffect, useState, Fragment } from "react";
import "./timehack.css";

import glassSkin from './images/glassskin.png';
import milliondollars from './images/milliondollars.png';
import girls from './images/girls.png';
import perfectphysique from './images/perfectphysique.png';
import dj from './images/dj.png';
import CharacterStats from './CharacterStats';

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
        skincare
        red & blue light therapy
        scrap tongue
        water floss`,
    9: "stretch, try to perform split",
    10: `learn stocks
         buy every stock`,
    11: "go on date with girl",
    12: `cook/eat lunch
         consume protein`,
    13: `learn a language
        answer 10 sample questions on Chat GPT
        learn 10 kanji: 天 石 天 生 入 出 高 安 新 古`,
    14: "work on music - piano track",
    15: "film/edit video for YouTube",
    16: [
      "lift dumbells",
      "go running"
    ],
    17: "clear photos on Macbook (46 GB) and SSD drive (300 GB)",
    18: "cook/eat dinner",
    19: "learn to shoot guns",
    20: "find reference photos from Instagram or Tiktok",
    21: `work on personal site`,
    22: `selfcare
         skincare
         scrap tongue`,
    23: "read book",
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
    10: { text: "become millionaire", image: milliondollars, alt: "million dollars" },
    11: { text: "develop roster", image: girls, alt: "girls" },
    12: "Fuel body for peak performance",
    13: "Become trilingual + improve memory",
    14: { text: "become world class DJ", image: dj, alt: "dj" },
    15: "Grow YouTube channel + digital presence",
    16: { text: "Build elite-level fitness", image: perfectphysique, alt: "perfect physique" },
    17: "Organize digital life",
    18: "Maintain strong evening nutrition habits",
    19: "Become fluent in Korean",
    20: "6 solid photos",
    21: "Build online presence + personal branding",
    22: "Maintain healthy, clean appearance",
    23: "gain knowledge",
  };
  
  const datedTasks = {    
    "2026-1-5": { 11: "dine at Chase OpenTable resturant for $150 credit" },
    "2027-1-4": { 11: "propose to girlfriend" },
    "2028-1-5": { 2: "penis enlargement" },
    "2029-1-5": { 2: "height surgery" }
  }
;

  const hours = [...Array(24).keys()];
  const sortedHours = [...hours.slice(currentHour), ...hours.slice(0, currentHour)];
  const minuteProgress = (currentTime.getMinutes() / 60) * 100;

  const toggleExpand = (hour) => {
    setExpandedHour(prev => prev === hour ? null : hour);
  };

  return (
    <div className="timehack">
      <h1>TimeHack</h1>
      <CharacterStats />
      <div className="hours-list">
        {sortedHours.map((hour) => {
          const isCurrentHour = hour === currentHour;
          const dateKey = hour >= currentHour ? todayKey : tomorrowKey;
          const task = datedTasks[dateKey]?.[hour] || dailyTasks[hour] || "No task assigned";
          const mission = higherMissions[hour];

          // Check if task is an array (for split hours like 16 with two 30-min tasks)
          const isSplitHour = Array.isArray(task);
          
          if (isSplitHour && hour === 16) {
            // Render two separate blocks for hour 16 (16:00-16:30 and 16:30-17:00)
            return (
              <Fragment key={`${hour}-split-${dateKey}`}>
                {task.map((subTask, index) => {
              const timeLabel = index === 0 ? "16:00-16:30" : "16:30-17:00";
              const isFirstHalf = index === 0;
              const currentMinutes = currentTime.getMinutes();
              const isCurrentHalf = isCurrentHour && ((isFirstHalf && currentMinutes < 30) || (!isFirstHalf && currentMinutes >= 30));
              const isSleepTask = subTask === "sleep";
              const expandedKey = `16-${index}`;
              const isExpanded = expandedHour === expandedKey;
              
              return (
                <div 
                  key={`${hour}-${index}-${dateKey}`} 
                  className={`hour-block ${isCurrentHalf ? "current-hour" : ""} ${isSleepTask ? "sleep-task" : ""}`}
                >
                  <div
                    className="hour-row"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpand(expandedKey);
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
                      <div className="hour-label">{timeLabel}</div>
                      <div className="task" style={{ whiteSpace: "pre-line" }}>{subTask}</div>
                    </div>
                    {isExpanded ? "▼" : "▶"}
                  </div>

                  {isExpanded && mission && (
                    <div className="higher-mission" style={{ marginTop: "6px", padding: "6px 12px", background: "#eef9ff", borderRadius: "6px" }}>
                      <strong>Goal:</strong>{" "}
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

                  {isCurrentHalf && (
                    <div className="hour-progress">
                      <div className="hour-progress-fill" style={{ width: `${minuteProgress}%` }}></div>
                    </div>
                  )}
                </div>
              );
              })}
              </Fragment>
            );
          }

          // Regular single-hour block
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
