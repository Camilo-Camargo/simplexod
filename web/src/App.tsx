import { useState } from 'react';
import './App.css'
import Equation, { EquationObject } from './components/Equation';
import ExpressionAdd from './components/ExpressionAdd';

function App() {
  const [objective, setObjective] = useState<Array<number>>([0, 0]);
  const [constraints, setConstraits] = useState<EquationObject>({
    independents: [10, 20],
    dependent: 10,
    operator: 0
  });
  return (
    <>
      <ExpressionAdd
        terms={objective}
        setTerms={setObjective}
        onClick={() => {
          const terms2 = [...objective];
          terms2.push(0);
          setObjective(terms2)

          const constraint2 = {...constraints};
          constraint2.independents.push(0);
          setConstraits(constraint2);
        }}
      />
      <Equation
        equation={constraints}
        setEquation={setConstraits}
      />
    </>
  )
}

export default App
