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
      alignItems: "center",
      gap: 5
    }}>
      <Coefficient
        value={value}
        onChange={onChange}
      />
      <span>{variable}{subindex}</span>
    </div>
  );
}
