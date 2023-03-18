import { FiMinus, FiPlus } from "react-icons/fi";
import "./ButtonAdd.css"

export type ButtonAddProps = {
  onClickAdd: () => void
  onClickMinus: () => void
};

export default function ButtonAdd({
  onClickAdd,
  onClickMinus
}: ButtonAddProps) {
  return (
    <div className="btn-add-minus">
      <div
        className="btn-add"
        onClick={onClickAdd}
      >
        <FiPlus size="20" />
      </div>
      <div 
        className="btn-minus"
        onClick={onClickMinus}
      >
      <FiMinus size="20"/>
      </div>
    </div>
  );
}
