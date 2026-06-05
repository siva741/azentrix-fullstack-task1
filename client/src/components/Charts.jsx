import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiPieChart } from "react-icons/fi";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#06b6d4",
  "#f59e0b",
  "#8b5cf6",
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

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
  const totalExpense = expenseData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950">
            Monthly Expense Breakdown
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {formatCurrency(totalExpense)}
          </p>
        </div>

        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-700">
          <FiPieChart className="h-5 w-5" />
        </div>
      </div>

      {expenseData.length === 0 ? (
        <div className="mt-8 grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center">
          <div>
            <FiPieChart className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm font-semibold text-slate-500">
              No expenses for this month
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={54}
                  outerRadius={95}
                  paddingAngle={3}
                  labelLine={false}
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value),
                    "Amount",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {expenseData.map((item, index) => {
              const percentage = Math.round(
                (item.value / totalExpense) * 100
              );

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />
                    <span className="truncate text-sm font-semibold text-slate-700">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-950">
                      {formatCurrency(item.value)}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {percentage}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Charts;
