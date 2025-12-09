import React from "react";
import { useParams } from "react-router-dom";
import datedTasks from "./datedTasks";

function TagTasks() {
  const { tag } = useParams();
  const tagKey = (tag || "").toLowerCase();

  const entries = [];

  Object.entries(datedTasks).forEach(([date, tasksForDate]) => {
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
