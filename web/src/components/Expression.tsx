import Term from "./Term";
import { FiPlus } from "react-icons/fi";

export type ExpressionProps = {
  setTerms: React.Dispatch<React.SetStateAction<Array<number>>>
  terms: Array<number>
};

export default function Expression({
  terms,
  setTerms
}: ExpressionProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }}
    >
      {
        terms.map((item, index) => {
          return (
            <>
              <Term
                key={index}
                value={item}
                variable={"x"}
                subindex={index + 1}
                onChange={
                  (item) => {
                    const coefficients = [...terms];
                    coefficients[index] = item!;
                    setTerms(coefficients);
                  }
                }
              />

              {
                terms.length - 1 != index ?
                  <FiPlus size="10" />
                  :
                  <></>
              }
            </>
          );
        })
      }
    </div>
  );
}
