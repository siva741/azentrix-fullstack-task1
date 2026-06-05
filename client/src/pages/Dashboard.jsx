import { useState, useEffect } from "react";
import Charts from "../components/Charts";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  const [editingTransaction, setEditingTransaction] =
    useState(null);

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
        <SummaryCards transactions={transactions} />

        <Charts transactions={transactions} />

        <TransactionForm
          addTransaction={addTransaction}
          editingTransaction={editingTransaction}
          updateTransaction={updateTransaction}
        />

        <TransactionTable
          transactions={transactions}
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
        />
      </div>
    </div>
  );
}

export default Dashboard;