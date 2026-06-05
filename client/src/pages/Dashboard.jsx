import { useState, useEffect } from "react";
import Charts from "../components/Charts";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/Summarycards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { FiCalendar, FiList } from "react-icons/fi";

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

  const monthLabel = selectedMonth
    ? new Date(`${selectedMonth}-01T00:00:00`).toLocaleDateString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "Select a month";

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

  const cancelEdit = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-white bg-white p-5 shadow-sm shadow-slate-200/70 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                {monthLabel}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Monthly Dashboard
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Month
                <span className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <FiCalendar className="h-4 w-4 text-emerald-600" />
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) =>
                      setSelectedMonth(e.target.value)
                    }
                    className="w-full bg-transparent text-slate-950 outline-none"
                  />
                </span>
              </label>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <FiList className="h-4 w-4 text-cyan-600" />
                  Entries
                </div>
                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {monthlyTransactions.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <SummaryCards transactions={monthlyTransactions} />

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <TransactionForm
            key={editingTransaction?.id ?? selectedMonth}
            addTransaction={addTransaction}
            editingTransaction={editingTransaction}
            updateTransaction={updateTransaction}
            cancelEdit={cancelEdit}
            selectedMonth={selectedMonth}
          />

          <Charts transactions={monthlyTransactions} />
        </div>

        <TransactionTable
          transactions={monthlyTransactions}
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
        />
      </main>
    </div>
  );
}

export default Dashboard;
