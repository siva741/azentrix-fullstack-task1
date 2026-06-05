import { useState, useEffect } from "react";
import Charts from "../components/Charts";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/Summarycards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    return new Date().toISOString().slice(0, 7);
  });

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const monthlyTransactions = transactions.filter((transaction) =>
    transaction.date?.startsWith(selectedMonth)
  );

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        ...transaction,
      },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Monthly Dashboard
            </h2>
            <p className="text-sm text-slate-600">
              Summary for the selected month.
            </p>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Month
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm"
            />
          </label>
        </div>

        <SummaryCards transactions={monthlyTransactions} />

        <Charts transactions={monthlyTransactions} />

        <TransactionForm
          addTransaction={addTransaction}
          editingTransaction={editingTransaction}
          updateTransaction={updateTransaction}
        />

        <TransactionTable
          transactions={monthlyTransactions}
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
        />
      </div>
    </div>
  );
}

export default Dashboard;
