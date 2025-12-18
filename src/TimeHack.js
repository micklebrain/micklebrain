import { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import "./timehack.css";

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
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [draggingTodoId, setDraggingTodoId] = useState(null);
  const [hourOrder, setHourOrder] = useState(null);
  const [initialHourOrder, setInitialHourOrder] = useState(null);
  const [draggingHour, setDraggingHour] = useState(null);
  const [hourTaskOverrides, setHourTaskOverrides] = useState({});
  const [editingHourKey, setEditingHourKey] = useState(null);
  const [editingHourText, setEditingHourText] = useState("");
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
        // Trust backend as the source of truth for completion state
        setTodos(fetchedTodos);
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

  useEffect(() => {
    let cancelled = false;

    const loadHourOrder = async () => {
      try {
        const response = await fetch(
          "https://lostmindsbackend.vercel.app/hourOrder"
        );
        if (!response.ok) return;
        const data = await response.json();
        const order = data && Array.isArray(data.order) ? data.order : null;

        const isValidOrder =
          order &&
          order.length === 24 &&
          order.every((h) => Number.isInteger(h) && h >= 0 && h < 24);

        if (isValidOrder) {
          if (!cancelled) {
            setHourOrder(order);
            setInitialHourOrder(order);
          }
        } else {
          const defaultOrder = [...Array(24).keys()];

          if (!cancelled) {
            setHourOrder(defaultOrder);
            setInitialHourOrder(defaultOrder);
          }

          fetch("https://lostmindsbackend.vercel.app/hourOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: defaultOrder }),
          }).catch((e) => {
            console.error("Failed to save default hour order", e);
          });
        }
      } catch {
        // ignore network errors; fall back to local/default order
      }
    };

    loadHourOrder();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      if (Array.isArray(hourOrder) && hourOrder.length === 24) {
        localStorage.setItem(
          "timehack-hour-order",
          JSON.stringify(hourOrder)
        );
      } else {
        localStorage.removeItem("timehack-hour-order");
      }
    } catch {
      // ignore write errors
    }
  }, [hourOrder]);

  useEffect(() => {
    let cancelled = false;

    const loadHourTasks = async () => {
      try {
        const response = await fetch(
          "https://lostmindsbackend.vercel.app/hourTasks"
        );
        if (!response.ok) return;
        const data = await response.json();
        const rawTasks = data && data.tasks;
        if (!rawTasks || typeof rawTasks !== "object") return;

        const mapped = {};
        Object.keys(rawTasks).forEach((key) => {
          const hour = Number(key);
          const value = rawTasks[key];
          if (
            !Number.isInteger(hour) ||
            hour < 0 ||
            hour >= 24
          ) {
            return;
          }

          if (typeof value === "string") {
            mapped[hour] = value;
          } else if (Array.isArray(value)) {
            mapped[hour] = value
              .filter((v) => typeof v === "string")
              .map((v) => v);
          }
        });

        if (!cancelled) {
          setHourTaskOverrides(mapped);
        }
      } catch {
        // ignore network errors; fall back to defaults
      }
    };

    loadHourTasks();

    return () => {
      cancelled = true;
    };
  }, []);

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
  // Each entry can be a single config { text, days?, tags? }
  // or an array of configs [{ text, days?, tags? }, ...].
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
        tags: ["peak physique"],
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
    14: { text: "work on music - piano track", tags: ["motion"] },
    15: { text: "film/edit video for YouTube", tags: ["motion"] },
    16: {
      text: [
        "lift dumbells",
        "go running",
      ],
    },
    17: {
      text: "clear photos on Macbook (54 GB) and SSD drive (373 GB)",
    },
    18: { text: "cook/eat dinner" },
    19: { text: "learn to dance" },
	    20: {
	      text: `find reference photos from Instagram or Tiktok
	         learn fashion
	         learn hair`,
	    },
	    21: {
	      text: [
	        "practice public speaking",
	        "practice public speaking",
	      ],
	    },
    22: {
      text: `selfcare
         skincare
         scrap tongue`,
    },
    23: { text: `work on personal site` },
  };

  const hours = [...Array(24).keys()];
  const defaultSortedHours = [...hours];
  const hoursLoaded =
    Array.isArray(hourOrder) && hourOrder.length === 24;
  const baseHourOrder = hoursLoaded ? hourOrder : defaultSortedHours;
  const currentIndexInBase = baseHourOrder.indexOf(currentHour);
  const effectiveHourOrder =
    hoursLoaded && currentIndexInBase !== -1
      ? [
          ...baseHourOrder.slice(currentIndexInBase),
          ...baseHourOrder.slice(0, currentIndexInBase),
        ]
      : [];

  useEffect(() => {
    if (
      !Array.isArray(initialHourOrder) ||
      initialHourOrder.length !== 24
    ) {
      setInitialHourOrder(defaultSortedHours);
    }
    // We intentionally only run this once with the initial default
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const minuteProgress = (currentTime.getMinutes() / 60) * 100;
  const weekdayIndex = currentTime.getDay(); // 0 (Sun) - 6 (Sat)

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
	
	      if (prevTodo && isLikelyMongoId) {
	        const nowDone = !wasDone;
	        const endpoint = nowDone ? "complete" : "incomplete";
	        fetch(
	          `https://lostmindsbackend.vercel.app/todos/${encodeURIComponent(
	            String(id)
	          )}/${endpoint}`,
	          {
	            method: "POST",
	          }
	        ).catch((e) => {
	          console.error(
	            `Failed to mark todo ${endpoint} in backend`,
	            e
	          );
	        });
	      }
	
	      return next;
	    });
	  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter((todo) => todo.id !== id));
  };

  const handleDragStart = (id) => {
    setDraggingTodoId(id);
  };

  const handleDragOver = (event, overId) => {
    event.preventDefault();
    if (draggingTodoId == null || draggingTodoId === overId) return;

    setTodos((prev) => {
      const currentIndex = prev.findIndex((t) => t.id === draggingTodoId);
      const overIndex = prev.findIndex((t) => t.id === overId);
      if (currentIndex === -1 || overIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(currentIndex, 1);
      next.splice(overIndex, 0, moved);
      return next;
    });
  };

  const handleDragEnd = () => {
    setDraggingTodoId(null);
  };

  const persistHourOrderToBackend = (order) => {
    if (
      !Array.isArray(order) ||
      order.length !== 24 ||
      !order.every((h) => Number.isInteger(h) && h >= 0 && h < 24)
    ) {
      return;
    }

    fetch("https://lostmindsbackend.vercel.app/hourOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    }).catch((e) => {
      console.error("Failed to persist hour order", e);
    });
  };

  const handleHourDragStart = (hour) => {
    setDraggingHour(hour);
    setHourOrder((prev) => prev ?? defaultSortedHours);
  };

  const handleHourDragOver = (event, overHour) => {
    event.preventDefault();
    if (draggingHour == null || draggingHour === overHour) return;

    setHourOrder((prev) => {
      const base = prev ?? defaultSortedHours;
      const currentIndex = base.indexOf(draggingHour);
      const overIndex = base.indexOf(overHour);
      if (currentIndex === -1 || overIndex === -1) return base;
      const next = [...base];
      const [moved] = next.splice(currentIndex, 1);
      next.splice(overIndex, 0, moved);
      return next;
    });
  };

  const handleHourDragEnd = () => {
    setDraggingHour(null);
    if (hourOrder) {
      persistHourOrderToBackend(hourOrder);
    }
  };

  const handleResetHours = async () => {
    // Prefer the order implied by hourTasks in the backend
    try {
      const response = await fetch(
        "https://lostmindsbackend.vercel.app/hourTasks"
      );
      if (response.ok) {
        const data = await response.json();
        const rawTasks = data && data.tasks;
        if (rawTasks && typeof rawTasks === "object") {
          const orderFromTasks = Object.keys(rawTasks)
            .map((key) => Number(key))
            .filter(
              (h) => Number.isInteger(h) && h >= 0 && h < 24
            )
            .sort((a, b) => a - b);

          if (orderFromTasks.length > 0) {
            setHourOrder(orderFromTasks);
            return;
          }
        }
      }
    } catch (e) {
      console.error("Failed to reload hour order from hourTasks", e);
    }

    // Fallback to the initial/default order in memory
    const base =
      (Array.isArray(initialHourOrder) &&
        initialHourOrder.length === 24 &&
        initialHourOrder) ||
      defaultSortedHours;
    setHourOrder(base);
  };

  const startEditingHour = (hourKey, currentTask) => {
    let text = "";
    if (typeof currentTask === "string") {
      text = currentTask;
    } else if (Array.isArray(currentTask)) {
      text = currentTask.join("\n");
    }
    setEditingHourKey(hourKey);
    setEditingHourText(text);
  };

  const cancelEditingHour = () => {
    setEditingHourKey(null);
    setEditingHourText("");
  };

  const saveEditingHour = (hourKey) => {
    const trimmed = editingHourText.trim();
    const newText = trimmed;

    setHourTaskOverrides((prev) => ({
      ...prev,
      [hourKey]: newText,
    }));

    setEditingHourKey(null);
    setEditingHourText("");

    fetch(
      `https://lostmindsbackend.vercel.app/hourTasks/${encodeURIComponent(
        String(hourKey)
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      }
    ).catch((e) => {
      console.error("Failed to save hour task", e);
    });
  };

  const upcomingDatedTasks = Object.entries(datedTasks)
    .filter(([date]) => date >= todayKey)
    .sort(([a], [b]) => a.localeCompare(b));

  const allDatedTaskTags = Array.from(
    new Set(
      Object.values(datedTasks).flatMap((tasksForDate) =>
        Object.values(tasksForDate).flatMap((value) => {
          if (typeof value === "string") return [];
          const rawTags = Array.isArray(value.tags) ? value.tags : [];
          return rawTags
            .map((t) => String(t).toLowerCase())
            .filter((t) => t.trim().length > 0);
        })
      )
    )
  );

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
                draggable
                onDragStart={() => handleDragStart(todo.id)}
                onDragOver={(e) => handleDragOver(e, todo.id)}
                onDragEnd={handleDragEnd}
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
      <div className="hours-header">
        <h1>24 hours</h1>
        <button
          type="button"
          className="daily-todo-refresh-btn"
          onClick={handleResetHours}
        >
          Reset
        </button>
      </div>
      <div className="hours-list">
        {effectiveHourOrder.map((hourKey, index) => {
          const displayHour = hourKey;
          const isCurrentHour = displayHour === currentHour;
          const dateKey = displayHour >= currentHour ? todayKey : tomorrowKey;
          const taskConfig = dailyTasks[hourKey];

          let task = "No task assigned";
          let taskTags = [];
          if (Array.isArray(taskConfig)) {
            const match = taskConfig.find(
              (cfg) =>
                cfg &&
                (!Array.isArray(cfg.days) ||
                  cfg.days.includes(weekdayIndex))
            );
            if (match) {
              task = match.text;
              const rawTags = Array.isArray(match.tags) ? match.tags : [];
              taskTags = rawTags.map((t) => String(t).toLowerCase());
            }
          } else if (taskConfig) {
            const allowed =
              !Array.isArray(taskConfig.days) ||
              taskConfig.days.includes(weekdayIndex);
            if (allowed) {
              task = taskConfig.text;
              const rawTags = Array.isArray(taskConfig.tags)
                ? taskConfig.tags
                : [];
              taskTags = rawTags.map((t) => String(t).toLowerCase());
            }
          }
          const isEveningHour = displayHour >= 18 || displayHour <= 7; // 6pm (18:00) to 7am

          const overrideValue = hourTaskOverrides[hourKey];
          if (Array.isArray(overrideValue)) {
            task = overrideValue;
          } else if (typeof overrideValue === "string") {
            task = overrideValue;
          }

          // Check if task is an array (for split hours with two 30-min tasks)
          const isSplitHour = Array.isArray(task);
          const isEditingThisHour = editingHourKey === hourKey;
          
          if (!isEditingThisHour && isSplitHour) {
            // Render two separate 30-min blocks for split hours
	            return (
	              <Fragment key={`${hourKey}-split-${dateKey}`}>
	                {task.map((subTask, subIndex) => {
              const startMinutes = subIndex === 0 ? 0 : 30;
              const endMinutes = subIndex === 0 ? 30 : 60;
              const startHourLabel = String(displayHour).padStart(2, "0");
              const endHourValue =
                (displayHour + (subIndex === 0 && endMinutes === 60 ? 1 : 0)) % 24;
              const endHourLabel =
                endMinutes === 60
                  ? String(endHourValue).padStart(2, "0")
                  : startHourLabel;
              const timeLabel = `${startHourLabel}:${startMinutes
                .toString()
                .padStart(2, "0")}-${endHourLabel}:${(endMinutes % 60)
                .toString()
                .padStart(2, "0")}`;
              const isFirstHalf = subIndex === 0;
              const currentMinutes = currentTime.getMinutes();
	              const isCurrentHalf = isCurrentHour && ((isFirstHalf && currentMinutes < 30) || (!isFirstHalf && currentMinutes >= 30));
	              const isSleepTask = subTask === "sleep";
	              
	              return (
	                <div 
	                  key={`${hourKey}-${subIndex}-${dateKey}`} 
	                  className={`hour-block ${isCurrentHalf ? "current-hour" : ""} ${isSleepTask ? "sleep-task" : ""} ${isEveningHour ? "evening-hour" : ""}`}
	                  draggable
	                  onDragStart={() => handleHourDragStart(hourKey)}
	                  onDragOver={(e) => handleHourDragOver(e, hourKey)}
	                  onDragEnd={handleHourDragEnd}
	                >
	                  <div
	                    className="hour-row"
	                    style={{ 
	                      display: "flex", 
	                      justifyContent: "space-between", 
	                      alignItems: "center",
	                      transition: "background-color 0.2s"
	                    }}
	                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isSleepTask ? "rgba(0, 0, 0, 0.05)" : "rgba(10, 165, 255, 0.05)"}
	                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
	                  >
	                    <div className="hour-left">
	                      <div className="hour-label">
	                        <div>{timeLabel}</div>
	                        <div
	                          className={`hour-icon ${
	                            isEveningHour ? "hour-icon-night" : "hour-icon-day"
	                          }`}
	                        />
	                      </div>
	                      <div className="task" style={{ whiteSpace: "pre-line" }}>{subTask}</div>
	                    </div>
	                  </div>

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
	              key={`${hourKey}-${dateKey}`} 
	              className={`hour-block ${isCurrentHour ? "current-hour" : ""} ${isSleepTask ? "sleep-task" : ""} ${isEveningHour ? "evening-hour" : ""}`}
	              draggable
	              onDragStart={() => handleHourDragStart(hourKey)}
	              onDragOver={(e) => handleHourDragOver(e, hourKey)}
	              onDragEnd={handleHourDragEnd}
	            >
	              <div
	                className="hour-row"
	                style={{ 
	                  display: "flex", 
	                  justifyContent: "space-between", 
	                  alignItems: "center",
	                  transition: "background-color 0.2s"
	                }}
	                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isSleepTask ? "rgba(0, 0, 0, 0.05)" : "rgba(10, 165, 255, 0.05)"}
	                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
	              >
                  <div className="hour-left">
                    <div className="hour-label">
                      <div>{String(displayHour).padStart(2, "0")}:00</div>
                      <div
                        className={`hour-icon ${
                          isEveningHour ? "hour-icon-night" : "hour-icon-day"
                        }`}
                      />
                    </div>
                    {isEditingThisHour ? (
                      <div className="hour-edit">
                        <textarea
                          className="hour-edit-input"
                          value={editingHourText}
                          onChange={(e) => setEditingHourText(e.target.value)}
                          rows={3}
                        />
                        <div className="hour-edit-actions">
                          <button
                            type="button"
                            className="hour-edit-save"
                            onClick={(e) => {
                              e.stopPropagation();
                              saveEditingHour(hourKey);
                            }}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="hour-edit-cancel"
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelEditingHour();
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="task"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {task}
                        </div>
                        {taskTags.map((tag) => (
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
                      </>
                    )}
                  </div>
	                  {!isEditingThisHour && (
	                    <button
	                      type="button"
	                      className="hour-edit-toggle"
	                      onClick={(e) => {
	                        e.preventDefault();
	                        e.stopPropagation();
	                        startEditingHour(hourKey, task);
	                      }}
	                    >
	                      Edit
	                    </button>
	                  )}
	              </div>
	              
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
        {allDatedTaskTags.length > 0 && (
          <div className="dated-tasks-tags-summary">
            {allDatedTaskTags.map((tag) => (
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
          </div>
        )}
        <h3 className="dated-tasks-title">Upcoming</h3>
        {upcomingDatedTasks.length === 0 ? (
          <div className="dated-tasks-empty">
            No scheduled dated tasks.
          </div>
        ) : (
          (() => {
            let lastYear = null;
            let lastMonth = null;
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
              const showMonthHeader =
                showYearHeader || monthNumber !== lastMonth;
              lastYear = year;
              lastMonth = monthNumber;
              const isTodayDate = date === todayKey;

              return (
                <Fragment key={date}>
                  {showYearHeader && (
                    <div className="dated-tasks-year">{year}</div>
                  )}
                  {showMonthHeader && (
                    <div className="dated-tasks-month">{monthLabel}</div>
                  )}
                  <div
                    className={`dated-tasks-date-block ${
                      isTodayDate ? "dated-tasks-date-block-today" : ""
                    }`}
                  >
                    <div className="dated-tasks-date">
                      {weekdayLabel && `${weekdayLabel} `}
                      {dayNumber}
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
