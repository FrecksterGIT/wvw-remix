import type { IMatch } from "~/models/interfaces.server";
import { useIncomes } from "~/hooks/use-incomes";
import { PieChart } from "react-minimal-pie-chart";

interface CurrentIncomesChartProps {
  match: IMatch;
}

export const CurrentIncomesChart = ({ match }: CurrentIncomesChartProps) => {
  const incomes = useIncomes(match.maps);

  return (
    <PieChart
      className="h-[50px] w-[50px] overflow-hidden"
      paddingAngle={3}
      data={[
        { key: "green", value: incomes.green, color: "#1e7b2d" },
        { key: "blue", value: incomes.blue, color: "#1a4da1" },
        { key: "red", value: incomes.red, color: "#b02822" },
      ]}
    />
  );
};
