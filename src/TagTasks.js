import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import datedTasks from "./datedTasks";

const parseTags = (value) => {
  if (!value) return [];
  const tags = value
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);
  return Array.from(new Set(tags));
};

const normalizeDatedTasks = (input) => {
  if (!input || typeof input !== "object") return null;
  const normalized = {};
  Object.entries(input).forEach(([date, tasksForDate]) => {
    if (!tasksForDate || typeof tasksForDate !== "object") return;
    const dayTasks = {};
    Object.entries(tasksForDate).forEach(([hour, value]) => {
      if (typeof value === "string") {
        dayTasks[hour] = value;
      } else if (value && typeof value === "object") {
        const rawTags = Array.isArray(value.tags)
          ? value.tags.join(",")
          : typeof value.tags === "string"
          ? value.tags
          : "";
        dayTasks[hour] = {
          text: value.text || "",
          tags: parseTags(rawTags),
        };
      }
    });
    normalized[date] = dayTasks;
  });
  return normalized;
};

function TagTasks() {
  const { tag } = useParams();
  const tagKey = (tag || "").toLowerCase();
  const [datedTasksState, setDatedTasksState] = useState(() => {
    try {
      const stored = localStorage.getItem("timehack-dated-tasks");
      if (stored) {
        const parsed = JSON.parse(stored);
        const normalized = normalizeDatedTasks(parsed);
        if (normalized) return normalized;
      }
    } catch {
      // ignore read errors
    }
    return normalizeDatedTasks(datedTasks) || {};
  });

  useEffect(() => {
    let cancelled = false;

    const loadDatedTasks = async () => {
      try {
        const response = await fetch(
          "https://lostmindsbackend.vercel.app/datedTasks"
        );
        if (!response.ok) return;
        const data = await response.json();
        const normalized = normalizeDatedTasks(data && data.tasks);
        if (normalized && Object.keys(normalized).length > 0 && !cancelled) {
          setDatedTasksState(normalized);
          try {
            localStorage.setItem(
              "timehack-dated-tasks",
              JSON.stringify(normalized)
            );
          } catch {
            // ignore write errors
          }
          return;
        }

        if (!cancelled) {
          const seedTasks = datedTasksState;
          fetch("https://lostmindsbackend.vercel.app/datedTasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tasks: seedTasks }),
          }).catch((e) => {
            console.error("Failed to seed dated tasks", e);
          });
        }
      } catch {
        // ignore network errors
      }
    };

    loadDatedTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  const entries = [];

  Object.entries(datedTasksState).forEach(([date, tasksForDate]) => {
    Object.entries(tasksForDate).forEach(([hour, value]) => {
      let text = "";
      let tags = [];

      if (typeof value === "string") {
        text = value;
      } else if (value && typeof value === "object") {
        text = value.text || "";
        const rawTags = Array.isArray(value.tags) ? value.tags : [];
        tags = rawTags.map((t) => String(t).toLowerCase());
      }

      const lowerText = text.toLowerCase();

      if (!tags.includes("jlpt") && lowerText.includes("pass jlpt")) {
        tags = [...tags, "jlpt"];
      }

      if (!tags.includes("finance") && lowerText.includes("net worth")) {
        tags = [...tags, "finance"];
      }

      if (tags.includes(tagKey)) {
        entries.push({
          date,
          hour: Number(hour),
          text,
        });
      }
    });
  });

  entries.sort((a, b) => {
    if (a.date === b.date) {
      return a.hour - b.hour;
    }
    return a.date.localeCompare(b.date);
  });

  const title = tagKey ? `${tagKey.toUpperCase()} Dated Tasks` : "Tagged Tasks";

  return (
    <div className="timehack">
      <h1>{title}</h1>
      {entries.length === 0 ? (
        <div className="dated-tasks-empty">No tasks for this tag.</div>
      ) : (
        <div className="dated-tasks">
          {entries.map(({ date, hour, text }) => (
            <div key={`${date}-${hour}`} className="dated-tasks-date-block">
              <div className="dated-tasks-date">
                {date} — {String(hour).padStart(2, "0")}:00
              </div>
              <div className="dated-tasks-text">{text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagTasks;
