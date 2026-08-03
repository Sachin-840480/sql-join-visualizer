import { useEffect, useMemo, useState } from "react";

export default function JoinAnimator({
    salaries,
    titles,
    joinType
}) {

    const [step, setStep] = useState(0);
    const [playing, setPlaying] = useState(false);

    const currentSalary = salaries[step];

    const titleIndex = useMemo(() => {

        if (!currentSalary) return -1;

        return titles.findIndex(title => {

            if (title.emp_no !== currentSalary.emp_no)
                return false;

            const salaryDate =
                new Date(currentSalary.from_date);

            const plus2 = new Date(salaryDate);
            plus2.setDate(plus2.getDate() + 2);

            const plus2String =
                plus2.toISOString().slice(0,10);

            return (
                title.from_date === currentSalary.from_date ||
                title.from_date === plus2String
            );

        });

    }, [step]);

    useEffect(() => {

        if (!playing)
            return;

        const timer = setTimeout(() => {

            setStep(prev => {

                if (prev >= salaries.length-1){

                    setPlaying(false);
                    return prev;
                }

                return prev+1;

            });

        },1800);

        return ()=>clearTimeout(timer);

    },[playing,step]);

    const resultRows = [];

    for(let i=0;i<=step;i++){

        const salary=salaries[i];

        const title=titles.find(t=>{

            if(t.emp_no!==salary.emp_no)
                return false;

            const d=new Date(salary.from_date);

            const d2=new Date(d);

            d2.setDate(d2.getDate()+2);

            return(

                t.from_date===salary.from_date ||

                t.from_date===d2.toISOString().slice(0,10)

            );

        });

        if(title){

            resultRows.push({

                emp_no:salary.emp_no,

                salary:salary.salary,

                title:title.title

            });

        }

        else if(joinType==="left"){

            resultRows.push({

                emp_no:salary.emp_no,

                salary:salary.salary,

                title:"No Title Change"

            });

        }

    }

    return(

        <>

        <div className="animation-panel">

            <div className="status-card">

                <h2>

                    Processing salary row

                    {step+1}

                    /

                    {salaries.length}

                </h2>

                <h3>

                    Employee

                    {currentSalary.emp_no}

                </h3>

                <p>

                    Salary

                    {currentSalary.salary}

                </p>

                <p>

                    From

                    {currentSalary.from_date}

                </p>

            </div>

            <div className="buttons">

                <button

                onClick={()=>setStep(Math.max(step-1,0))}

                >

                    Previous

                </button>

                <button

                onClick={()=>setStep(Math.min(step+1,salaries.length-1))}

                >

                    Next

                </button>

                <button

                onClick={()=>setPlaying(!playing)}

                >

                    {

                        playing

                        ?

                        "Pause"

                        :

                        "Auto Play"

                    }

                </button>

                <button

                onClick={()=>{

                    setStep(0);
                    setPlaying(false);

                }}

                >

                    Restart

                </button>

            </div>

        </div>

        <div className="result-card">

            <h2>

                Result Table

            </h2>

            <table>

                <thead>

                    <tr>

                        <th>emp_no</th>

                        <th>salary</th>

                        <th>title</th>

                    </tr>

                </thead>

                <tbody>

                {

                    resultRows.map((row,index)=>(

                        <tr

                        key={index}

                        className="new-row"

                        >

                            <td>{row.emp_no}</td>

                            <td>{row.salary}</td>

                            <td>{row.title}</td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

        </>

    );

}