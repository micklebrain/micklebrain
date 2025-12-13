import { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import "./timehack.css";

import glassSkin from "./images/glassskin.png";
import milliondollars from "./images/milliondollars.png";
import girls from "./images/girls.png";
import perfectphysique from "./images/perfectphysique.png";
import dj from "./images/dj.png";
import CharacterStats from "./CharacterStats";
import datedTasks from "./datedTasks";

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
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  const history = useHistory();

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

  const getWeekdayLabel = (dateKey) => {
    const [yearStr, monthStr, dayStr] = dateKey.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return "";
    const date = new Date(year, month - 1, day);
    const index = date.getDay();
    return WEEKDAY_NAMES[index] ?? "";
  };

  const todayKey = formatDateKey(currentTime);
  const todayWeekday = getWeekdayLabel(todayKey);
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow);

  const defaultDailyTodos = [
    // "stop and talk to hot girl",
  ];

  const buildDefaultTodos = () =>
    defaultDailyTodos.map((text, index) => ({
      id: Date.now() + index,
      text,
      done: false,
    }));

  const fetchTodosFromBackend = async () => {
    const response = await fetch("https://lostmindsbackend.vercel.app/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await response.json();

    const items = Array.isArray(data?.doc)
      ? data.doc
      : Array.isArray(data)
      ? data
      : data && typeof data === "object"
      ? [data]
      : [];

    const fetchedTodos = items
      .map((item, index) => {
        const text = (item.name || "").trim();
        if (!text) return null;
        const rawId =
          (item._id && (item._id.$oid || item._id)) ?? Date.now() + index;
        return {
          id: rawId,
          text,
          done: !!item.isCompleted,
        };
      })
      .filter(Boolean);

    return fetchedTodos;
  };

  // Daily to-do list that refreshes each day
  useEffect(() => {
    let cancelled = false;

    const loadTodos = async () => {
      try {
        const stored = localStorage.getItem(`timehack-todos-${todayKey}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            if (!cancelled) setTodos(parsed);
            return;
          }
        }

        // If no stored todos for today, fetch from backend
        try {
          const fetchedTodos = await fetchTodosFromBackend();
          if (fetchedTodos.length > 0) {
            if (!cancelled) setTodos(fetchedTodos);
            return;
          }
        } catch {
          // If fetch fails, fall back to local defaults below
        }

        if (!cancelled) setTodos(buildDefaultTodos());
      } catch {
        if (!cancelled) setTodos(buildDefaultTodos());
      }
    };

    loadTodos();

    return () => {
      cancelled = true;
    };
  }, [todayKey]);
  
  const handleRefreshTodos = async () => {
    try {
      const fetchedTodos = await fetchTodosFromBackend();
      if (fetchedTodos.length > 0) {
        setTodos((prev) => {
          const prevById = new Map(
            prev.map((todo) => [String(todo.id), todo])
          );

          return fetchedTodos.map((todo) => {
            const key = String(todo.id);
            const prevTodo = prevById.get(key);
            // If either local or backend says "done", keep it done.
            return prevTodo
              ? { ...todo, done: !!(prevTodo.done || todo.done) }
              : todo;
          });
        });
      }
    } catch (e) {
      // optional: could show an error state; for now, ignore
      console.error("Failed to refresh todos", e);
    }
  };

  const handleResetTodos = () => {
    // Optimistically reset locally
    setTodos((prev) => prev.map((todo) => ({ ...todo, done: false })));

    // Also reset in backend so future refreshes stay in sync
    fetch("https://lostmindsbackend.vercel.app/todos/reset", {
      method: "POST",
    }).catch((e) => {
      console.error("Failed to reset todos in backend", e);
    });
  };

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

  // Daily tasks per hour.
  // Each entry can be a single config { text, days? }
  // or an array of configs [{ text, days? }, ...].
  // days: optional array of weekday indices (0=Sun..6=Sat); omit for "any day".
  const dailyTasks = {
    0: { text: "sleep" },
    1: { text: "sleep" },
    2: { text: "sleep" },
    3: { text: "sleep" },
    4: { text: "sleep" },
    5: { text: "sleep" },
    6: { text: "sleep" },
    7: { text: "sleep" },
    8: {
      text: `selfcare        
        red & blue light therapy (face)
        red & blue light therapy (body)
        ice face
        scrap tongue
        water floss
        skincare`,
    },
    9: {
      text: `stretch
        try to perform split`,
    },
    10: [
      {
        text: `learn stocks
         buy every stock`,
        days: [1, 2, 3, 4, 5], // Mon–Fri
      },
      {
        text: "meditate",
        days: [0, 6], // Sun & Sat
      },
    ],
    11: { text: "go on date with girl" },
    12: {
      text: `cook/eat lunch
         consume protein`,
    },
    13: {
      text: `learn a language
         answer 10 sample questions on Chat GPT
         learn 10 kanji: 天 石 論 生 入 出 高 安 新 古`,
    },
    14: { text: "work on music - piano track" },
    15: { text: "film/edit video for YouTube" },
    16: {
      text: [
        "lift dumbells",
        "go running",
      ],
    },
    17: {
      text: "clear photos on Macbook (46 GB) and SSD drive (300 GB)",
    },
    18: { text: "cook/eat dinner" },
    19: { text: "learn to dance" },
    20: {
      text: `find reference photos from Instagram or Tiktok
         learn fashion
         learn hair`,
    },
    21: { text: "practice public speaking" },
    22: {
      text: `selfcare
         skincare
         scrap tongue`,
    },
    23: { text: `work on personal site` },
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

  const hours = [...Array(24).keys()];
  const sortedHours = [...hours.slice(currentHour), ...hours.slice(0, currentHour)];
  const minuteProgress = (currentTime.getMinutes() / 60) * 100;
  const weekdayIndex = currentTime.getDay(); // 0 (Sun) - 6 (Sat)

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
    const isLikelyMongoId = /^[0-9a-fA-F]{24}$/.test(String(id));

    setTodos((prev) => {
      const prevTodo = prev.find((todo) => todo.id === id);
      const wasDone = prevTodo?.done;

      const next = prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );

      // If this looks like a Mongo ObjectId and is being marked complete now, send update
      if (prevTodo && !wasDone && isLikelyMongoId) {
        fetch(
          `https://lostmindsbackend.vercel.app/todos/${encodeURIComponent(
            String(id)
          )}/complete`,
          {
            method: "POST",
          }
        ).catch((e) => {
          console.error("Failed to mark todo complete in backend", e);
        });
      }

      return next;
    });
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
          <div className="daily-todo-header-right">
            <div className="daily-todo-date">
              {todayWeekday && `${todayWeekday} `}{todayKey}
            </div>
            <button
              type="button"
              className="daily-todo-refresh-btn"
              onClick={handleRefreshTodos}
            >
              Refresh
            </button>
            <button
              type="button"
              className="daily-todo-refresh-btn"
              onClick={handleResetTodos}
            >
              Reset
            </button>
          </div>
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
          const taskConfig = dailyTasks[hour];

          let task = "No task assigned";
          if (Array.isArray(taskConfig)) {
            const match = taskConfig.find(
              (cfg) =>
                cfg &&
                (!Array.isArray(cfg.days) ||
                  cfg.days.includes(weekdayIndex))
            );
            if (match) {
              task = match.text;
            }
          } else if (taskConfig) {
            const allowed =
              !Array.isArray(taskConfig.days) ||
              taskConfig.days.includes(weekdayIndex);
            if (allowed) {
              task = taskConfig.text;
            }
          }
          const mission = higherMissions[hour];
          const isEveningHour = hour >= 18 || hour <= 7; // 6pm (18:00) to 7am

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
              className={`hour-block ${isCurrentHour ? "current-hour" : ""} ${isSleepTask ? "sleep-task" : ""} ${isEveningHour ? "evening-hour" : ""}`}
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
                {hour === 14 && (
                  <button
                    type="button"
                    className="dated-tasks-tag"
                    onClick={() => {
                      history.push("/tags/motion");
                    }}
                  >
                    MOTION
                  </button>
                )}
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
              const weekdayLabel = getWeekdayLabel(date);
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
                      {weekdayLabel && `${weekdayLabel} `}
                      <span className="dated-tasks-month-label">{monthLabel}</span> {dayNumber}
                      {(() => {
                        const age = getAgeOnDateKey(date);
                        return age != null ? `  (age ${age})` : "";
                      })()}
                    </div>
                    <ul className="dated-tasks-list">
                      {Object.entries(tasksForDate)
                        .sort(([h1], [h2]) => Number(h1) - Number(h2))
                        .map(([hour, value]) => {
                          let taskText = "";
                          let tags = [];

                          if (typeof value === "string") {
                            taskText = value;
                          } else if (value && typeof value === "object") {
                            taskText = value.text || "";
                            const rawTags = Array.isArray(value.tags) ? value.tags : [];
                            tags = rawTags.map((t) => String(t).toLowerCase());
                          }

                          return (
                            <li
                              key={`${date}-${hour}`}
                              className="dated-tasks-item"
                            >
                              <span className="dated-tasks-hour">
                                {String(hour).padStart(2, "0")}:00
                              </span>
                              <span className="dated-tasks-text">
                                {taskText}
                              </span>
                              {tags.map((tag) => (
                                <button
                                  key={tag}
                                  type="button"
                                  className="dated-tasks-tag"
                                  onClick={() => {
                                    history.push(`/tags/${tag}`);
                                  }}
                                >
                                  {tag.toUpperCase()}
                                </button>
                              ))}
                            </li>
                          );
                        })}
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
