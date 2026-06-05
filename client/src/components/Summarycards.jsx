import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiTrendingUp,
} from "react-icons/fi";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;
  const cards = [
    {
      label: "Monthly Income",
      value: income,
      icon: FiArrowUpRight,
      accent: "bg-emerald-500",
      iconStyle: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Monthly Expense",
      value: expense,
      icon: FiArrowDownRight,
      accent: "bg-rose-500",
      iconStyle: "bg-rose-50 text-rose-700",
    },
    {
      label: "Monthly Balance",
      value: balance,
      icon: FiTrendingUp,
      accent: "bg-cyan-500",
      iconStyle: "bg-cyan-50 text-cyan-700",
    },
  ];

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60"
          >
            <div className={`h-1.5 ${card.accent}`} />
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h2 className="text-sm font-semibold text-slate-500">
                  {card.label}
                </h2>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  {formatCurrency(card.value)}
                </p>
              </div>

              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${card.iconStyle}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;
