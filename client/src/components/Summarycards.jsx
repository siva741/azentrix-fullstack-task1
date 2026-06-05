function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      <div className="bg-green-500 text-white p-6 rounded-xl shadow">
        <h2>Monthly Income</h2>
        <p className="text-3xl font-bold">Rs {income}</p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded-xl shadow">
        <h2>Monthly Expense</h2>
        <p className="text-3xl font-bold">Rs {expense}</p>
      </div>

      <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
        <h2>Monthly Balance</h2>
        <p className="text-3xl font-bold">Rs {balance}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
