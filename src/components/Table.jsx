export default function Table({
    title,
    columns,
    rows,
    highlightedRow = -1,
    matchedRow = -1,
    failedRow = -1
}) {
    return (
        <div className="table-card">

            <h2>{title}</h2>

            <table>

                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {rows.map((row, index) => {

                        let className = "";

                        if (index === highlightedRow)
                            className = "current-row";

                        if (index === matchedRow)
                            className = "matched-row";

                        if (index === failedRow)
                            className = "failed-row";

                        return (
                            <tr
                                key={index}
                                className={className}
                            >

                                {columns.map(col => (
                                    <td key={col}>
                                        {row[col] ?? ""}
                                    </td>
                                ))}

                            </tr>
                        );
                    })}

                </tbody>

            </table>

        </div>
    );
}