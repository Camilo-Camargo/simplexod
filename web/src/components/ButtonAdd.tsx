import { FiPlus } from "react-icons/fi";

export type ButtonAddProps = {
  onClick: () => void
};

export default function ButtonAdd({
  onClick
}: ButtonAddProps) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "2px",
        border: "1px solid black"
      }}
      onClick={onClick}
    >
      <FiPlus size="20" />
    </div>
  );
}
