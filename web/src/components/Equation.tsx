import React from "react";
import Coefficient from "./Coefficient";
import Expression, { ExpressionProps } from "./Expression";
import InequalityPicker from "./InequalityPicker";

export type EquationObject = {
  independents: Array<number>
  dependent: number
  operator: number
};


export type EquationProps = {
  equation: EquationObject
  setEquation: React.Dispatch<React.SetStateAction<EquationObject>>
};

export default function Equation({
  equation,
  setEquation
}: EquationProps) {
  
  return (
    <div
      style={{
        display: "flex",
        gap: 10
      }}
    >
      <Expression
        terms={equation.independents}
        setTerms={(value) => {
          const equation2 = {...equation};
          equation2.independents = value as Array<number>;
          setEquation(equation2);
        }}
      />
      <InequalityPicker
        onChange={(value) => {
          const equation2 = {...equation};
          equation2.operator = value as number;
          setEquation(equation2);
        }}
      />
      <Coefficient
        value={equation.dependent}
        onChange={(value) => {
          const equation2 = {...equation};
          equation2.dependent = value as number;
          setEquation(equation2);
        }}
      />
    </div>
  );
}
