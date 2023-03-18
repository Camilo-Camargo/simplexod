import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { SimplexMethodType } from './@types/Enums';
import './App.css'
import react from "./assets/react.svg"
import springboot from "./assets/spring.svg"
import { EquationObject } from './components/Equation';
import Equations from './components/Equations';
import ExpressionAdd from './components/ExpressionAdd';

function App() {
  const [simplex, setSimplex] = useState<boolean>(false);
  const [type, setType] = useState<SimplexMethodType>(SimplexMethodType.MAXIMIZE);
  const [objective, setObjective] = useState<Array<number>>([0, 0]);
  const [equations, setEquations] = useState<Array<EquationObject>>([{
    independents: [0, 0],
    dependent: 0,
    operator: 0
  }]);

  const [tableu, setTableu] = useState<Array<Array<Array<number>>>>(
    [
      [
        [1, 2]
      ]
    ]
  );

  useEffect(() => {
    const simplexObjective = [
      ...objective.flatMap((value) => (isNaN(value) ? 0 : value))
    ];
    const simplexConstraints = equations.flatMap((equation) => ([[
      equation.independents.flatMap((value) => (isNaN(value) ? 0 : value)),
      equation.dependent || 0,
    ].flat()]));

    const simplexConstraintTypes = equations.flatMap((equation) => (
      equation.operator
    ))

    fetch("/simplex", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        objective: simplexObjective,
        constraints: simplexConstraints,
        constraintTypes: simplexConstraintTypes,
        type: type
      })
    })
      .then((res) => res.json())
      .then(data => setTableu(data));
  }, [simplex]);

  return (
    <div
      className="simplex"
    >
      <div
        className="simplex-header"
      >
        <h1>Simple <span>Method</span></h1>
        <a href="https://www.github.com/camilo-camargo">
          <p>camilo-camargo</p>
        </a>
      </div>
      <div>
        <div className="simplex-objective">
          <h2 className="title">Objective Function</h2>
          <div className="simplex-objective-expression">
            <ExpressionAdd
              terms={objective}
              setTerms={setObjective}
              onClickAdd={() => {
                const terms2 = [...objective];
                terms2.push(0);
                setObjective(terms2)

                const equations2 = [...equations];
                equations2.map((equation) => { equation.independents.push(0) });
                setEquations(equations2);
              }}

              onClickMinus={() => {
                if (objective.length == 2) return;
                const terms2 = [...objective];
                terms2.pop();
                setObjective(terms2)

                const equations2 = [...equations];
                equations2.map((equation) => {
                  equation.independents.pop()
                });
                setEquations(equations2);

              }}
            />

            <select
              onChange={(value) => setType(parseInt(value.target.value))}>
              <option value={SimplexMethodType.MAXIMIZE} label="Maximize" />
              <option value={SimplexMethodType.MINIMIZE} label="Minimize" />
            </select>
          </div>
        </div>
      </div>

      <div className="simplex-restrictions">
        <h2 className="title">Restrictions</h2>
        <div>
          <Equations
            objective={objective}
            equations={equations}
            setEquations={setEquations}
          />
        </div>
      </div>


      <button
        onClick={() => setSimplex(!simplex)}
      >
        Solve
      </button>

      <div
        className="simplex-tableau"
      >
        {tableu &&
          tableu.map((iteration, index) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: "2rem" }}>
                <h2>Iteration {index + 1}</h2>
                <table
                  key={index}
                  className="tableau"
                >
                  {
                    <tr>
                      {
                        objective.map((__, index) => <th key={index}>{`X${index + 1}`}</th>)
                      }
                      {
                        objective.map((__, index) => <th key={index}>{`S${index + 1}`}</th>)
                      }
                      <th>Quantity</th>
                    </tr>
                  }

                  {
                    iteration.map((rows) => <tr>{
                      rows.map((column) => <td>{column}</td>)
                    }</tr>)
                  }
                </table>
              </div>
            );
          })
        }
      </div>

      <button onClick={() => {
        // create a new jspdf instance
        const height = window.innerHeight;
        const width = window.innerWidth;
        const doc = new jsPDF({
          orientation: "l",
          unit: "pt",
          format: [width, height] 
        }
        );

        // set the size of the jspdf document to the size of the window

        // use html2canvas to capture a screenshot of the entire window
        html2canvas(document.documentElement, {
          // ...
        }).then(function(canvas) {
          // add the screenshot to the PDF
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = doc.internal.pageSize.getWidth();
          const imgHeight = canvas.height * imgWidth / canvas.width;
          const x = 0;
          const y = (doc.internal.pageSize.getHeight() - imgHeight) / 2;
          doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

          // save the PDF
          doc.save("simplexod.pdf");
        })
      }}>Generate PDF</button>

      <div className="simplex-footer">
        <div className="simplex-footer-icons">
          <img src={react} />
          <img src={springboot} />
        </div>
        <div className="simplex-footer-text">
          <p>
            Power by
            <span> React + Spring Boot </span>
          </p>
        </div>
      </div>
    </div >
  )
}

export default App
