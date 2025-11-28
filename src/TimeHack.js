import { useEffect, useState } from "react";
import "./timehack.css";

function TimeHack() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  // DAILY TASKS (replaces tasks + tomorrowTasks)
  const dailyTasks = {
    0: "sleep",
    1: "sleep",
    2: "sleep",
    3: "sleep",
    4: "sleep",
    5: "sleep",
    6: "sleep",
    7: "sleep",
    8: "skincare",
    9: "stretch, try to perform split",
    10: "work on schedule in Pages",
    11: "learn Korean",
    12: "cook/eat lunch",
    13: "learn a language (Japanese/Vietnamese/Korean)\nanswer 10 sample questions\nlearn 10 kanji: 天 石 天 生 入 出 高 安 新 古",
    14: "work on music - piano track",
    15: "film/edit video for YouTube",
    16: "workout\nlift dumbells\ngo running",
    17: "clear photos on Macbook and SSD drive",
    18: "cook/eat dinner",
    19: "learn Korean",
    20: "find reference photos from Instagram or Tiktok",
    21: "work on personal site\nwrite blog post",
    22: "skincare",
    23: "do backflip",
  };

  // DATED TASKS WITH LOCAL DATE KEYS
  const datedTasks = {
    "2025-11-28": {
      11: "go Black Friday shopping at Citadel Outlets"      
    }
  };

  // Helper: format local date as YYYY-MM-DD
  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const todayKey = formatDateKey(new Date());
  const tomorrowKey = formatDateKey(new Date(Date.now() + 86400000));

  const getRowClass = (hour) => {
    if (currentHour === hour) return "active-task";
    if (currentHour > hour) return "past-task";
    return "";
  };

  const getFormattedDate = () => {
    const today = new Date();
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return `${monthNames[today.getMonth()]} ${today.getDate()} - ${dayNames[today.getDay()]}`;
  };

  // Build base 24-hour array
  const allHours = [...Array(24)].map((_, hour) => ({
    hour,
    task: dailyTasks[hour] || "To be determined",
  }));

  // Build 24-hour schedule starting from current hour
  const sortedHours = [...Array(24)].map((_, index) => {
    const hourIndex = (currentHour + index) % 24;
    const rolledPastMidnight = hourIndex < currentHour;

    const dateKey = rolledPastMidnight ? tomorrowKey : todayKey;

    // Check for dated override
    const datedOverride =
      datedTasks[dateKey] && datedTasks[dateKey][hourIndex]
        ? datedTasks[dateKey][hourIndex]
        : null;

    return {
      hour: hourIndex,
      task: datedOverride || allHours[hourIndex].task,
    };
  });

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h1>{getFormattedDate()}</h1>
        <table className="schedule">
          <thead>
            <tr>
              <th className="time">Time</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {sortedHours.map(({ hour, task }, i) => {
              const displayHour = hour % 12 === 0 ? 12 : hour % 12;
              const ampm = hour < 12 ? "AM" : "PM";
              return (
                <tr key={`${hour}-${i}`} className={getRowClass(hour)}>
                  <td>{displayHour}:00 {ampm}</td>
                  <td style={{ whiteSpace: "pre-line" }}>{task}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ width: '250px', marginLeft: '20px' }}>
        <div className="motivation" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p>"No time left"</p>
          <p>"Not enough urgency"</p>
          <p>"Take advantage of AI"</p>
          <p>"Live in the moment"</p>
        </div>
      </div>
    </div>
  );
}

export default TimeHack;
