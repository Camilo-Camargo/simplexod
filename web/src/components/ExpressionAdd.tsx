import ButtonAdd, { ButtonAddProps } from "./ButtonAdd";
import Expression, { ExpressionProps } from "./Expression";

export type ExpressionAddProps = {
} & ExpressionProps & ButtonAddProps;

export default function ExpressionAdd({
  terms,
  setTerms,
  onClick
}: ExpressionAddProps) {
  return (
    <div
      style={{ 
        display: "flex",
        gap: 20
      }}
    >
      <Expression
        terms={terms}
        setTerms={setTerms}
      />
      <ButtonAdd
        onClick={onClick}
      />
    </div>
  );
}
