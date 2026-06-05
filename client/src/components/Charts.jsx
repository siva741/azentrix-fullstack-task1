import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
];

function Charts({ transactions }) {
  const expenseData = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => {
      const existing = acc.find(
        (item) => item.name === curr.category
      );

      if (existing) {
        existing.value += Number(curr.amount);
      } else {
        acc.push({
          name: curr.category,
          value: Number(curr.amount),
        });
      }

      return acc;
    }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Expense Breakdown
      </h2>

      {expenseData.length === 0 ? (
        <p className="text-gray-500">
          Add expense transactions to see the chart.
        </p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {expenseData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Charts;