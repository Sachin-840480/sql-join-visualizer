import { useMemo, useState } from "react";

export default function JoinAnimator({
    salaries,
    titles,
    joinType
}) {

    /*
        Every salary row becomes one animation step.
    */

    const [step, setStep] = useState(0);

    const currentSalary = salaries[step];

    const titleIndex = useMemo(() => {

        if (!currentSalary)
            return -1;

        return titles.findIndex(title => {

            const sameEmployee =
                title.emp_no === currentSalary.emp_no;

            const sameDate =
                title.from_date === currentSalary.from_date;

            const plusTwoDays = (() => {

                const salaryDate =
                    new Date(currentSalary.from_date);

                salaryDate.setDate(
                    salaryDate.getDate() + 2
                );

                const yyyy =
                    salaryDate.getFullYear();

                const mm =
                    String(
                        salaryDate.getMonth() + 1
                    ).padStart(2, "0");

                const dd =
                    String(
                        salaryDate.getDate()
                    ).padStart(2, "0");

                return (
                    title.from_date ===
                    `${yyyy}-${mm}-${dd}`
                );

            })();

            return (
                sameEmployee &&
                (sameDate || plusTwoDays)
            );

        });

    }, [step, salaries, titles]);

    const hasMatch = titleIndex !== -1;

    return (

        <div className="animation-box">

            <div className="status">

                <h2>

                    Step {step + 1}
                    {" "}
                    of
                    {" "}
                    {salaries.length}

                </h2>

                <p>

                    Checking salary record for employee

                    <strong>
                        {" "}
                        {currentSalary.emp_no}
                    </strong>

                </p>

                <div className="result-message">

                    {hasMatch ? (

                        <span className="success">

                            ✔ Matching title found

                        </span>

                    ) : joinType === "left" ? (

                        <span className="warning">

                            No title found.
                            LEFT JOIN keeps this row.

                        </span>

                    ) : (

                        <span className="danger">

                            No title found.
                            INNER JOIN removes this row.

                        </span>

                    )}

                </div>

            </div>

            <div className="animation-controls">

                <button
                    onClick={() =>
                        setStep(Math.max(0, step - 1))
                    }
                >
                    ◀ Previous
                </button>

                <button
                    onClick={() =>
                        setStep(
                            Math.min(
                                salaries.length - 1,
                                step + 1
                            )
                        )
                    }
                >
                    Next ▶
                </button>

            </div>

        </div>

    );

}