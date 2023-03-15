import Coefficient, { CoefficientProps } from "./Coefficient";

export type TermProps = {
  variable: String
  subindex: number
} & CoefficientProps;

export default function Term({
  variable,
  subindex,
  value,
  onChange
}: TermProps) {
  return (
    <div style={{
      display: "flex",
      gap: 5
    }}>
      <Coefficient
        value={value}
        onChange={onChange}
      />
      <div>
        <span>{variable}</span>
        <span>{subindex}</span>
      </div>
    </div>
  );
}
