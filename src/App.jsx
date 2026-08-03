import { useState } from "react";

import Table from "./components/Table";
import JoinAnimator from "./components/JoinAnimator";

import { employees, salaries, titles } from "./data";

export default function App() {
  const [joinType, setJoinType] = useState("inner");

  return (
    <div className="container">
      <h1>SQL JOIN Visualizer</h1>

      <p className="subtitle">
        Learn how INNER JOIN and LEFT JOIN work visually.
      </p>

      <div className="join-buttons">
        <button
          className={joinType === "inner" ? "active" : ""}
          onClick={() => setJoinType("inner")}
        >
          INNER JOIN
        </button>

        <button
          className={joinType === "left" ? "active" : ""}
          onClick={() => setJoinType("left")}
        >
          LEFT JOIN
        </button>
      </div>

      <div className="tables">
        <Table title="Employees" columns={["emp_no"]} rows={employees} />

        <Table
          title="Salaries"
          columns={["emp_no", "salary", "from_date"]}
          rows={salaries}
        />

        <Table
          title="Titles"
          columns={["emp_no", "title", "from_date"]}
          rows={titles}
        />
      </div>

      <JoinAnimator salaries={salaries} titles={titles} joinType={joinType} />

      <div className="info-box">
        <h3>Selected Join</h3>

        <p>
          {joinType === "inner"
            ? "Only matching rows will appear in the result."
            : "All salary rows will appear. Missing titles become NULL."}
        </p>
      </div>

      <div className="placeholder">
        🚀 In Part 2 this area will animate the join process row-by-row.
      </div>
    </div>
  );
}
