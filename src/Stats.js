import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Stats = ({ results, numberOfSteps }) => {
  const mapResultsToLineChartData = (results) => {
    let data = results.map((r) => ({ step: r.step, cost: r.cost }));
    data.push({ step: numberOfSteps, cost: results[results.length - 1].cost });
    return data;
  };

  const data = mapResultsToLineChartData(results);

  return (
    <ScatterChart height={200} width={500}>
      <CartesianGrid />
      <XAxis
        type="number"
        dataKey="step"
        name="Step"
        range={[0, numberOfSteps]}
      />
      <YAxis type="number" dataKey="cost" name="Cost" />
      <Tooltip />
      <Scatter
        name="Cost per step"
        data={data}
        fill="#8884d8"
        line={{ strokeWidth: 2 }}
        shape={null}
      />
    </ScatterChart>
  );
};
