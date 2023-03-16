import { useState } from 'react';
import './App.css'
import { EquationObject } from './components/Equation';
import Equations from './components/Equations';
import ExpressionAdd from './components/ExpressionAdd';

function App() {
  const [objective, setObjective] = useState<Array<number>>([0, 0]);
  const [equations, setEquations] = useState<Array<EquationObject>>([{
    independents: [0, 0],
    dependent: 0,
    operator: 0
  }]);
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
    </>
  )
}

export default App
