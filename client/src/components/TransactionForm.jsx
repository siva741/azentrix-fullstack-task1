import { useState } from "react";
import {
  FiCalendar,
  FiPlus,
  FiSave,
  FiTag,
  FiType,
  FiX,
} from "react-icons/fi";

const getDefaultDate = (selectedMonth) => {
  const today = new Date().toISOString().slice(0, 10);

  if (!selectedMonth) {
    return today;
  }

  return today.startsWith(selectedMonth)
    ? today
    : `${selectedMonth}-01`;
};

const getEmptyFormData = (selectedMonth) => ({
  title: "",
  amount: "",
  type: "Income",
  category: "",
  date: getDefaultDate(selectedMonth),
});

function TransactionForm({
  addTransaction,
  editingTransaction,
  updateTransaction,
  cancelEdit,
  selectedMonth,
}) {
  const [formData, setFormData] = useState(() =>
    editingTransaction ?? getEmptyFormData(selectedMonth)
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(getEmptyFormData(selectedMonth));
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

  const handleCancel = () => {
    cancelEdit();
    resetForm();
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100";
  const labelClass =
    "flex flex-col gap-2 text-sm font-semibold text-slate-700";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">
            {editingTransaction ? "Edit Entry" : "New Entry"}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {editingTransaction
              ? "Update Transaction"
              : "Add Transaction"}
          </h2>
        </div>

        {editingTransaction ? (
          <button
            type="button"
            onClick={handleCancel}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            aria-label="Cancel edit"
            title="Cancel edit"
          >
            <FiX className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        <label className={labelClass}>
          Title
          <span className="relative">
            <FiType className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="Salary, groceries, rent"
              className={`${inputClass} pl-11`}
              required
            />
          </span>
        </label>

        <label className={labelClass}>
          Amount
          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            min="0"
            step="1"
            placeholder="5000"
            className={inputClass}
            required
          />
        </label>

        <label className={labelClass}>
          Type
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Income</option>
            <option>Expense</option>
          </select>
        </label>

        <label className={labelClass}>
          Category
          <span className="relative">
            <FiTag className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              type="text"
              placeholder="Food, travel, freelance"
              className={`${inputClass} pl-11`}
              required
            />
          </span>
        </label>

        <label className={labelClass}>
          Date
          <span className="relative">
            <FiCalendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
              className={`${inputClass} pl-11`}
              required
            />
          </span>
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 md:self-end"
        >
          {editingTransaction ? (
            <FiSave className="h-5 w-5" />
          ) : (
            <FiPlus className="h-5 w-5" />
          )}
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
