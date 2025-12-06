import { useEffect, useState, Fragment } from "react";
import "./timehack.css";

import glassSkin from "./images/glassskin.png";
import milliondollars from "./images/milliondollars.png";
import girls from "./images/girls.png";
import perfectphysique from "./images/perfectphysique.png";
import dj from "./images/dj.png";
import CharacterStats from "./CharacterStats";

const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"];
const TOPIK_LEVELS = ["I", "II", "III", "IV", "V", "VI"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function TimeHack() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedHour, setExpandedHour] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [jlptProgress, setJlptProgress] = useState(() => {
    try {
      const stored = localStorage.getItem("timehack-jlpt-progress");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.length === JLPT_LEVELS.length &&
          parsed.every(
            (item) =>
              item &&
              typeof item.level === "string" &&
              typeof item.completed === "boolean"
          )
        ) {
          return parsed;
        }
      }
    } catch {
      // ignore read errors
    }
    return JLPT_LEVELS.map((level) => ({ level, completed: false }));
  });
  const [topikProgress, setTopikProgress] = useState(() => {
    try {
      const stored = localStorage.getItem("timehack-topik-progress");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.length === TOPIK_LEVELS.length &&
          parsed.every(
            (item) =>
              item &&
              typeof item.level === "string" &&
              typeof item.completed === "boolean"
          )
        ) {
          return parsed;
        }
      }
    } catch {
      // ignore read errors
    }
    return TOPIK_LEVELS.map((level) => ({ level, completed: false }));
  });

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

  const BIRTHDATE = new Date(1995, 6, 4); // July 4, 1995 (month is 0-based)

  const getAgeOnDate = (date) => {
    const yearDiff = date.getFullYear() - BIRTHDATE.getFullYear();
    const hasHadBirthdayThisYear =
      date.getMonth() > BIRTHDATE.getMonth() ||
      (date.getMonth() === BIRTHDATE.getMonth() && date.getDate() >= BIRTHDATE.getDate());
    return hasHadBirthdayThisYear ? yearDiff : yearDiff - 1;
  };

  const getAgeOnDateKey = (dateKey) => {
    const [yearStr, monthStr, dayStr] = dateKey.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null;
    const date = new Date(year, month - 1, day);
    return getAgeOnDate(date);
  };

  const todayKey = formatDateKey(currentTime);
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow);

  const defaultDailyTodos = [
    "do 20 pushups",
    "eat 10 tomatoes",
    "drink 3.7 liters (125 oz) of water",
    "stop and talk to hot girl",
  ];

  const buildDefaultTodos = () =>
    defaultDailyTodos.map((text, index) => ({
      id: Date.now() + index,
      text,
      done: false,
    }));

  // Daily to-do list that refreshes each day
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`timehack-todos-${todayKey}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTodos(parsed);
        } else {
          setTodos(buildDefaultTodos());
        }
      } else {
        setTodos(buildDefaultTodos());
      }
    } catch {
      setTodos(buildDefaultTodos());
    }
  }, [todayKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`timehack-todos-${todayKey}`, JSON.stringify(todos));
    } catch {
      // ignore write errors
    }
  }, [todos, todayKey]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "timehack-jlpt-progress",
        JSON.stringify(jlptProgress)
      );
    } catch {
      // ignore write errors
    }
  }, [jlptProgress]);

  const toggleJlptLevel = (level) => {
    setJlptProgress((prev) =>
      prev.map((item) =>
        item.level === level
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem(
        "timehack-topik-progress",
        JSON.stringify(topikProgress)
      );
    } catch {
      // ignore write errors
    }
  }, [topikProgress]);

  const toggleTopikLevel = (level) => {
    setTopikProgress((prev) =>
      prev.map((item) =>
        item.level === level
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

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
        ice face
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
         learn 10 kanji: 天 石 論 生 入 出 高 安 新 古`,
    14: "work on music - piano track",
    15: "film/edit video for YouTube",
    16: [
      "lift dumbells",
      "go running"
    ],
    17: "clear photos on Macbook (46 GB) and SSD drive (300 GB)",
    18: "cook/eat dinner",
    19: "learn to dance",
    20: `find reference photos from Instagram or Tiktok
         learn fashion
         learn hair`,
    21: "practice public speaking",    
    22: `selfcare
         skincare
         scrap tongue`,
    23: `work on personal site`,
  };

  const higherMissions = {
    0: "replenish energy",
    1: "replenish energy",
    2: "replenish energy",
    3: "replenish energy",
    4: "replenish energy",
    5: "replenish energy",
    6: "replenish energy",
    7: "replenish energy",
    8: { text: "achieve glass skin", image: glassSkin, alt: "glass skin example" },
    9: "increase flexibility and body control",
    10: { text: "become millionaire", image: milliondollars, alt: "million dollars" },
    11: { text: "develop roster", image: girls, alt: "girls" },
    12: "fuel body for peak performance",
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
    "2025-12-07": { 14: "pay for Bangkok hotel" },
    "2025-12-08": { 11: "take ISI placement test" },
    "2026-01-05": { 11: "dine at Chase OpenTable resturant for $150 Sapphire credit" },
    "2027-01-04": { 11: "propose to girlfriend" },
    "2028-01-05": { 2: "achieve 500k net worth " },
    "2029-01-05": { 2: "surgery to increase height to 6ft" },
    "2030-01-05": { 2: "perform on EDC biggest stage" },
    "2031-01-05": { 2: "join Chase private banking" },
    "2032-01-05": { 2: "buy mom a house" },
    "2033-01-05": { 2: "solve aging" },
    "2034-01-05": { 2: "obtain Japan pernament residency" },
    "2035-01-05": { 2: "obtain Korea pernament residency" },
    "2036-01-05": { 2: "own all stocks on market" },
    "2036-01-05": { 2: "pass JLPT N5 test" },
    "2037-01-05": { 2: "pass JLPT N4 test" },
    "2038-01-05": { 2: "pass JLPT N3 test" },
    "2039-01-05": { 2: "pass JLPT N2 test" },
    "2040-01-05": { 2: "pass JLPT N1 test" },
    "2041-01-05": { 2: "pass TOPIK test" },
    "2042-01-05": { 2: "penis enlargement to 6 inches" },
    "2043-01-05": { 2: "achieve 1 million net worth" },
    "2044-01-05": { 2: "achieve 10 million net worth" },
    "2045-01-05": { 2: "achieve 100 million net worth" },
    "2046-01-05": { 2: "achieve 1 billion net worth" },
    "2047-01-05": { 2: "obtain 1 million Instagram followers" },
    "2048-01-05": { 2: "obtain 1 million TikTok followers" },
    "2049-01-05": { 2: "obtain 1 million Youtube subscribers" },
    "2050-01-05": { 2: "obtain 1 million Twitch subscribers" },
    "2051-01-05": { 2: "perform split" },
    "2052-01-05": { 2: "buy property in Singapore (South beach residences)" },
    "2053-01-05": { 2: "be on cover of Vogue magazine" },
    "2054-01-05": { 2: "be guest on talk show" },
    "2055-01-05": { 2: "become ambidextrous" },
    "2056-01-05": { 2: "buy place in Ginza Tokyo Japan" },
    "2057-01-05": { 2: "drive super-car" },
    "2058-01-05": { 2: "100k invested in real estate" },
    "2059-01-05": { 2: "achieve Marriott Lifetime Silver Elite Status" },
    "2060-01-05": { 2: "watch NBA all star game live" },
    "2061-01-05": { 2: "walk on red carpet " },
    "2062-01-05": { 2: "see a volcano" },
    "2063-01-05": { 2: "go sky diving" },
    "2064-01-05": { 2: "shoot sniper rifle" },
    "2065-01-05": { 2: "drive F1 car" },
    "2066-01-05": { 2: "watch F1 race live" },
    "2067-01-05": { 2: "drive speedboat" },
    "2068-01-05": { 2: "become president of USA" },
    "2069-01-05": { 2: "meet Jesus" },
    "2070-01-05": { 2: "run Triathalon" },
    "2071-01-05": { 2: "go hunting with guns" },
    "2072-01-05": { 2: "obtain degree from Harvard" },
    "2073-01-05": { 2: "be in a Redbull video" },
    "2074-01-05": { 2: "do a kickflip on skateboard" },
    "2075-01-05": { 2: "become streamer of the year" },
    "2076-01-05": { 2: "win a UFC belt" },
    "2077-01-05": { 2: "win a gold medal" },
    "2078-01-05": { 2: "explore bottom of the ocean" },
    "2079-01-05": { 2: "go to space" },
    "2080-01-05": { 2: "visit every continent" },
    "2081-01-05": { 2: "win a Grammy" },
    "2082-01-05": { 2: "win an Oscar" },
    "2083-01-05": { 2: "fly a fighter jet" },
    "2084-01-05": { 2: "become a Navy Seal" },
    "2085-01-05": { 2: "speak on Joe Rogan podcast" },
    "2086-01-05": { 2: "win body building competition" },
    "2087-01-05": { 2: "drive military tank" },
    "2088-01-05": { 2: "kill animal with bow and arrow" },
    "2089-01-05": { 2: "shoot a bazooka" },
    "2090-01-05": { 2: "give a speech to 100,000 people" },
    "2091-01-05": { 2: "take a company IPO" },
    "2092-01-05": { 2: "retire mom" },
    "2093-01-05": { 2: "retire dad" },
    "2094-01-05": { 2: "retire sister" },
    "2095-01-05": { 2: "become an actor in a box office movie with 1 million earnings" },
    "2096-01-05": { 2: "bury mom" },
    "2097-01-05": { 2: "donate 100,000 to charity" },
    "2098-01-05": { 2: "ride and horse and shoot arrow" },
    "2099-01-05": { 2: "see the Northern lights" },
    "2100-01-05": { 2: "ride snowboard in Dubai sands" },
    "2101-01-05": { 2: "swim in the Great Reefs" },
    "2102-01-05": { 2: "go surfing" },
    "2103-01-05": { 2: "do a split" },
    "2104-01-05": { 2: "do a backflip" },
    "2105-01-05": { 2: "cosplay at convention" },
    "2106-01-05": { 2: "have first kid" },
    "2107-01-05": { 2: "swim with dolphins" },
    "2108-01-05": { 2: "win hacker competition" },
    "2109-01-05": { 2: "give shoulder rides to 2 girls at rave" },
    "2110-01-05": { 2: "bury dad" },
    "2111-01-05": { 2: "explore a rainforest" },
    "2112-01-05": { 2: "enter art into musuem" },
    "2113-01-05": { 2: "fly first class" },
    "2114-01-05": { 2: "jump through ring of fire" },
    "2115-01-05": { 2: "go base jumping" },
    "2116-01-05": { 2: "enter my body into cryosleep" },  
  };

  const hours = [...Array(24).keys()];
  const sortedHours = [...hours.slice(currentHour), ...hours.slice(0, currentHour)];
  const minuteProgress = (currentTime.getMinutes() / 60) * 100;

  const toggleExpand = (hour) => {
    setExpandedHour(prev => prev === hour ? null : hour);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = newTodo.trim();
    if (!trimmed) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false }
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter((todo) => todo.id !== id));
  };

  const upcomingDatedTasks = Object.entries(datedTasks)
    .filter(([date]) => date >= todayKey)
    .sort(([a], [b]) => a.localeCompare(b));

  const jlptCompletedCount = jlptProgress.filter((l) => l.completed).length;
  const topikCompletedCount = topikProgress.filter((l) => l.completed).length;

  return (
    <div className="timehack">
      <h1>TimeHack</h1>
      <CharacterStats />      
      <div className="daily-todo">
        <div className="daily-todo-header">
          <h2 className="daily-todo-title">resolute To-Do</h2>
          <div className="daily-todo-date">{todayKey}</div>
        </div>
        <form className="daily-todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            className="daily-todo-input"
            placeholder="Add a task for today..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit" className="daily-todo-add-btn">
            Add
          </button>
        </form>
        <ul className="daily-todo-list">
          {todos.length === 0 ? (
            <li className="daily-todo-empty">No tasks yet. Add one above.</li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`daily-todo-item ${todo.done ? "done" : ""}`}
              >
                <label className="daily-todo-label">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="daily-todo-text">{todo.text}</span>
                </label>
                <button
                  type="button"
                  className="daily-todo-remove-btn"
                  onClick={() => removeTodo(todo.id)}
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <h1>24 hours</h1>
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
      <div className="jlpt-card">
        <div className="jlpt-header">
          <h2 className="jlpt-title">JLPT Progress</h2>
          <div className="jlpt-subtitle">
            {jlptCompletedCount}/{JLPT_LEVELS.length} levels cleared
          </div>
        </div>
        <div className="jlpt-levels">
          {jlptProgress.map(({ level, completed }) => (
            <button
              key={level}
              type="button"
              className={`jlpt-level ${
                completed ? "jlpt-level-completed" : ""
              }`}
              onClick={() => toggleJlptLevel(level)}
            >
              <span className="jlpt-level-label">{level}</span>
              <span className="jlpt-level-status">
                {completed ? "Cleared" : "Locked"}
              </span>
            </button>
          ))}
        </div>
        <div className="jlpt-note">
          Tap a level when you pass the official JLPT exam.
        </div>
      </div>
      <div className="jlpt-card">
        <div className="jlpt-header">
          <h2 className="jlpt-title">TOPIK Progress</h2>
          <div className="jlpt-subtitle">
            {topikCompletedCount}/{TOPIK_LEVELS.length} levels cleared
          </div>
        </div>
        <div className="jlpt-levels">
          {topikProgress.map(({ level, completed }) => (
            <button
              key={level}
              type="button"
              className={`jlpt-level ${
                completed ? "jlpt-level-completed" : ""
              }`}
              onClick={() => toggleTopikLevel(level)}
            >
              <span className="jlpt-level-label">{level}</span>
              <span className="jlpt-level-status">
                {completed ? "Cleared" : "Locked"}
              </span>
            </button>
          ))}
        </div>
        <div className="jlpt-note">
          Tap a level when you pass the official TOPIK exam.
        </div>
      </div>
      <div className="dated-tasks">
        <h3 className="dated-tasks-title">Upcoming</h3>
        {upcomingDatedTasks.length === 0 ? (
          <div className="dated-tasks-empty">
            No scheduled dated tasks.
          </div>
        ) : (
          (() => {
            let lastYear = null;
            return upcomingDatedTasks.map(([date, tasksForDate]) => {
              const year = date.slice(0, 4);
              const monthNumber = date.slice(5, 7);
              const dayNumber = String(Number(date.slice(8, 10)));
              const monthIndex = Number(monthNumber) - 1;
              const monthLabel =
                monthIndex >= 0 && monthIndex < MONTH_NAMES.length
                  ? MONTH_NAMES[monthIndex]
                  : monthNumber;

              const showYearHeader = year !== lastYear;
              lastYear = year;

              return (
                <Fragment key={date}>
                  {showYearHeader && (
                    <div className="dated-tasks-year">{year}</div>
                  )}
                  <div className="dated-tasks-date-block">
                    <div className="dated-tasks-date">
                      {monthLabel} {dayNumber}
                      {(() => {
                        const age = getAgeOnDateKey(date);
                        return age != null ? `  (age ${age})` : "";
                      })()}
                    </div>
                    <ul className="dated-tasks-list">
                      {Object.entries(tasksForDate)
                        .sort(([h1], [h2]) => Number(h1) - Number(h2))
                        .map(([hour, text]) => (
                          <li
                            key={`${date}-${hour}`}
                            className="dated-tasks-item"
                          >
                            <span className="dated-tasks-hour">
                              {String(hour).padStart(2, "0")}:00
                            </span>
                            <span className="dated-tasks-text">{text}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </Fragment>
              );
            });
          })()
        )}
      </div>
    </div>
  );
}

export default TimeHack;
