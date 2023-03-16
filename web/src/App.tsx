import { useEffect, useState } from 'react';
import './App.css'
import { EquationObject } from './components/Equation';
import Equations from './components/Equations';
import ExpressionAdd from './components/ExpressionAdd';

function App() {
  const [simplex, setSimplex] = useState<boolean>(false);
  const [objective, setObjective] = useState<Array<number>>([0, 0]);
  const [equations, setEquations] = useState<Array<EquationObject>>([{
    independents: [0, 0],
    dependent: 0,
    operator: 0
  }]);

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
        constraintTypes: simplexConstraintTypes
      })
    })
      .then((res) => res.json())
      .then(data => console.log(data));
  }, [simplex]);

  return (
    <>
      <ExpressionAdd
        terms={objective}
        setTerms={setObjective}
        onClick={() => {
          const terms2 = [...objective];
          terms2.push(0);
          setObjective(terms2)

          const equations2 = [...equations];
          equations2.map((equation) => { equation.independents.push(0) });
          setEquations(equations2);
        }}
      />
      <div>
        <Equations
          objective={objective}
          equations={equations}
          setEquations={setEquations}
        />
      </div>
      <button
        onClick={() => {
          setSimplex(!simplex);
        }}
      >Resolve</button>
    </>
  )
}

export default App
