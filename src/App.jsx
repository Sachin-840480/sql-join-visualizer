import { useState } from "react";

import {
    employees,
    salaries,
    titles
} from "./data";

export default function App() {

    const [joinType, setJoinType] = useState("inner");

    return (

        <div className="container">

            <h1>SQL JOIN Visualizer</h1>

            <p className="subtitle">
                Learn how INNER JOIN and LEFT JOIN work
                visually.
            </p>

            <div className="join-buttons">

                <button
                    className={
                        joinType === "inner"
                            ? "active"
                            : ""
                    }
                    onClick={() => setJoinType("inner")}
                >
                    INNER JOIN
                </button>

                <button
                    className={
                        joinType === "left"
                            ? "active"
                            : ""
                    }
                    onClick={() => setJoinType("left")}
                >
                    LEFT JOIN
                </button>

            </div>

            <div className="tables">

                <div className="table-card">

                    <h2>Employees</h2>

                    <table>

                        <thead>

                        <tr>
                            <th>emp_no</th>
                        </tr>

                        </thead>

                        <tbody>

                        {employees.map(emp => (

                            <tr key={emp.emp_no}>
                                <td>{emp.emp_no}</td>
                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

                <div className="table-card">

                    <h2>Salaries</h2>

                    <table>

                        <thead>

                        <tr>
                            <th>emp_no</th>
                            <th>salary</th>
                            <th>from_date</th>
                        </tr>

                        </thead>

                        <tbody>

                        {salaries.map((salary, index) => (

                            <tr key={index}>

                                <td>{salary.emp_no}</td>

                                <td>{salary.salary}</td>

                                <td>{salary.from_date}</td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

                <div className="table-card">

                    <h2>Titles</h2>

                    <table>

                        <thead>

                        <tr>

                            <th>emp_no</th>
                            <th>title</th>
                            <th>from_date</th>

                        </tr>

                        </thead>

                        <tbody>

                        {titles.map((title, index) => (

                            <tr key={index}>

                                <td>{title.emp_no}</td>

                                <td>{title.title}</td>

                                <td>{title.from_date}</td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="info-box">

                <h3>Selected Join</h3>

                <p>

                    {joinType === "inner"
                        ? "Only matching rows will appear in the result."
                        : "All salary rows will appear. Missing titles become NULL."}

                </p>

            </div>

            <div className="placeholder">

                🚀 In Part 2 this area will animate
                the join process row-by-row.

            </div>

        </div>
    );
}