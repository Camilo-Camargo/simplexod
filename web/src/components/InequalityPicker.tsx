import "./InequalityPicker.css"

export type InequalityPickerProps = {
  onChange: (value: number) => void
};

export default function InequalityPicker({
  onChange
}: InequalityPickerProps) {
  const className = "inequality_picker";
  const OPERATORS = [">=", "<=", "="];

  return (
    <select
      className={className}
      onChange={(e) => {
        onChange(parseInt(e.target.value));
      }}
    >
      {
        OPERATORS.map((item, index) => {
          return (
            <option
              key={index}
              value={index}
              label={OPERATORS[index]}
            />
          )
        })
      }
    </select>
  );
}
