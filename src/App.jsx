import { useState } from "react";

const employees = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const departments = [
  { id: 1, dept: "HR" },
  { id: 2, dept: "IT" },
  { id: 4, dept: "Finance" },
];

export default function App() {
  const [joinType, setJoinType] = useState("INNER");

  const rows = createJoin(joinType);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        SQL Join Visualizer
      </h1>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["INNER", "LEFT", "RIGHT", "FULL"].map((type) => (
          <button
            key={type}
            onClick={() => setJoinType(type)}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              joinType === type
                ? "bg-blue-600 text-white"
                : "bg-white shadow hover:bg-gray-200"
            }`}
          >
            {type} JOIN
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <Table
          title="Employees"
          columns={["ID", "Name"]}
          rows={employees.map((e) => [e.id, e.name])}
        />

        <Table
          title="Departments"
          columns={["ID", "Department"]}
          rows={departments.map((d) => [d.id, d.dept])}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {joinType} JOIN Result
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2">Employee ID</th>
              <th className="border p-2">Employee</th>
              <th className="border p-2">Department</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="text-center">
                <td className="border p-2">{r.id ?? "NULL"}</td>
                <td className="border p-2">{r.name ?? "NULL"}</td>
                <td className="border p-2">{r.dept ?? "NULL"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Table({ title, columns, rows }) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((c) => (
              <th key={c} className="border p-2">
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border p-2 text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function createJoin(type) {
  const result = [];

  if (type === "INNER") {
    employees.forEach((emp) => {
      const dep = departments.find((d) => d.id === emp.id);

      if (dep) {
        result.push({
          id: emp.id,
          name: emp.name,
          dept: dep.dept,
        });
      }
    });
  }

  if (type === "LEFT") {
    employees.forEach((emp) => {
      const dep = departments.find((d) => d.id === emp.id);

      result.push({
        id: emp.id,
        name: emp.name,
        dept: dep ? dep.dept : null,
      });
    });
  }

  if (type === "RIGHT") {
    departments.forEach((dep) => {
      const emp = employees.find((e) => e.id === dep.id);

      result.push({
        id: dep.id,
        name: emp ? emp.name : null,
        dept: dep.dept,
      });
    });
  }

  if (type === "FULL") {
    const ids = [...new Set([
      ...employees.map((e) => e.id),
      ...departments.map((d) => d.id),
    ])];

    ids.forEach((id) => {
      const emp = employees.find((e) => e.id === id);
      const dep = departments.find((d) => d.id === id);

      result.push({
        id,
        name: emp?.name ?? null,
        dept: dep?.dept ?? null,
      });
    });
  }

  return result;
}