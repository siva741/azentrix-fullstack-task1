import { useState, useEffect } from "react";

function TransactionForm({
  addTransaction,
  editingTransaction,
  updateTransaction,
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Income",
    category: "",
    date: "",
  });

  useEffect(() => {
  if (!editingTransaction) return;

  setTimeout(() => {
    setFormData(editingTransaction);
  }, 0);
}, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "Income",
      category: "",
      date: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTransaction) {
      updateTransaction(formData);
    } else {
      addTransaction(formData);
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          placeholder="Title"
          className="border p-3 rounded-lg"
          required
        />

        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          type="number"
          placeholder="Amount"
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          type="text"
          placeholder="Category"
          className="border p-3 rounded-lg"
          required
        />

        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-3"
        >
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;