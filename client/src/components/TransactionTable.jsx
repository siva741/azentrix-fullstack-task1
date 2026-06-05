import {
  FiEdit2,
  FiInbox,
  FiTrash2,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));

const formatDate = (date) => {
  if (!date) {
    return "No date";
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function TransactionTable({
  transactions,
  deleteTransaction,
  editTransaction,
}) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Ledger
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            Monthly Transactions
          </h2>
        </div>

        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
          {transactions.length}
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center">
          <div>
            <FiInbox className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm font-semibold text-slate-500">
              No transactions found for this month.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-bold uppercase text-slate-500">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {transactions.map((transaction) => {
                  const isIncome = transaction.type === "Income";
                  const TypeIcon = isIncome
                    ? FiTrendingUp
                    : FiTrendingDown;

                  return (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 font-semibold text-slate-950">
                        {transaction.title}
                      </td>

                      <td className="px-4 py-4 font-bold text-slate-950">
                        {formatCurrency(transaction.amount)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                            isIncome
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          <TypeIcon className="h-3.5 w-3.5" />
                          {transaction.type}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {transaction.category}
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {formatDate(transaction.date)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              editTransaction(transaction)
                            }
                            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                            aria-label="Edit transaction"
                            title="Edit transaction"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() =>
                              deleteTransaction(transaction.id)
                            }
                            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                            aria-label="Delete transaction"
                            title="Delete transaction"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "Income";
              const TypeIcon = isIncome
                ? FiTrendingUp
                : FiTrendingDown;

              return (
                <div
                  key={transaction.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">
                        {transaction.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {transaction.category} /{" "}
                        {formatDate(transaction.date)}
                      </p>
                    </div>

                    <p className="shrink-0 text-right font-bold text-slate-950">
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                        isIncome
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      <TypeIcon className="h-3.5 w-3.5" />
                      {transaction.type}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => editTransaction(transaction)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"
                      >
                        <FiEdit2 className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteTransaction(transaction.id)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm font-bold text-rose-700"
                      >
                        <FiTrash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionTable;
