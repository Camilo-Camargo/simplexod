import ButtonAdd from "./ButtonAdd";
import Equation, { EquationObject } from "./Equation";

export type EquationsProps = { 
  objective: Array<number>
  equations: Array<EquationObject>
  setEquations: React.Dispatch<React.SetStateAction<Array<EquationObject>>>
};

export default function Equations({
  objective,
  equations,
  setEquations
}: EquationsProps) {
  return (
    <>
      {
        equations && equations.map((equation, index) => {
          return (
            <Equation
              key={index}
              equation={equation}
              setEquation={(value) => {
                const equations2 = [...equations];
                equations2[index] = value as EquationObject;
                setEquations(equations2)
              }}
            />
          );
        })
      }

      <ButtonAdd
        onClick={() => {
          const equations2 = [...equations];
          equations2.push({
            independents: Array.from(
              { length: objective.length },
              (_, __) => 0
            ),
            dependent: 0,
            operator: 0
          });
          setEquations(equations2);
        }}
      />

    </>
  );
}
