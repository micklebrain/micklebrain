import { useEffect, useState } from "react";
import "./timehack.css";

function TimeHack() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // updates every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const currentHour = currentTime.getHours();

  // Local date formatter (no UTC issues)
  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Date keys for today + tomorrow
  const todayKey = formatDateKey(currentTime);
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow);

  // DAILY TASKS (your updated tasks)
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

  // DATED TASKS (your updated overrides)
  const datedTasks = {
    "2025-11-28": {
      11: "go Black Friday shopping at Citadel Outlets"
    }
  };

  // Build 24 hours, sorted to start from current hour
  const hours = [...Array(24).keys()];
  const sortedHours = [...hours.slice(currentHour), ...hours.slice(0, currentHour)];

  // Hour progress bar (% of current hour passed)
  const minuteProgress = (currentTime.getMinutes() / 60) * 100;

  return (
    <div className="timehack">
      <h1>TimeHack</h1>

      {sortedHours.map((hour, index) => {
        const isCurrentHour = hour === currentHour;

        // Determine if this row belongs to today or tomorrow
        const dateKey =
          index === 0 || hour >= currentHour ? todayKey : tomorrowKey;

        // Override if available
        const overrideTask =
          datedTasks[dateKey] && datedTasks[dateKey][hour]
            ? datedTasks[dateKey][hour]
            : null;

        const task = overrideTask || dailyTasks[hour] || "No task assigned";

        return (
          <div
            key={hour}
            className={`hour-block ${isCurrentHour ? "current-hour" : ""}`}
          >
            <div className="hour-label">{hour}:00</div>

            <div className="task" style={{ whiteSpace: "pre-line" }}>
              {task}
            </div>

            {/* Hour progress bar */}
            {isCurrentHour && (
              <div className="hour-progress">
                <div
                  className="hour-progress-fill"
                  style={{ width: `${minuteProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TimeHack;
