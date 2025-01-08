import React, { useState } from "react";
import LessonsList from "../components/Lessons/LessonsList";
import "./Lessons.css";

const Lessons = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="lessons-page">
      <div className="lessons-header">
        <h1>Lessons</h1>
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <LessonsList searchTerm={searchTerm} />
    </div>
  );
};

export default Lessons;
