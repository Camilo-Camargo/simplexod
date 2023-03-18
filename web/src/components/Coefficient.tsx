export type CoefficientProps = {
  value: number
  onChange: (value: number | void ) => void
};

export default function Coefficient({
  value,
  onChange
}: CoefficientProps) {
  return (
    <input
      value={value}
      onChange={(e) => {
        let target = e.target.value;
        onChange(parseInt(target));
      }}
      style={{
        width: `${value.toString().length}ch`,
        appearance: "textfield",
        textAlign: "center",
        padding: "0.5rem",
        fontSize: "2rem"
      }}
      type="number"
    />
  );
}
