import type { IMatch } from "~/models/interfaces.server";
import { useIncomes } from "~/hooks/use-incomes";

interface IncomeProps {
  match: IMatch;
}

export const CurrentIncomes = ({ match }: IncomeProps) => {
  const incomes = useIncomes(match.maps);

  return (
    <>
      <p>Income</p>
      <ul>
        <li>{incomes.green}</li>
        <li>{incomes.blue}</li>
        <li>{incomes.red}</li>
      </ul>
    </>
  );
};
