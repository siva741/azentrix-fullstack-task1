function TransactionTable({
  transactions,
  deleteTransaction,
  editTransaction,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Monthly Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border">
          <thead>
            <tr className="bg-slate-200">
              <th className="p-3">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-slate-500"
                >
                  No transactions found for this month.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="p-3 text-center">
                    {transaction.title}
                  </td>

                  <td className="p-3 text-center">
                    Rs {transaction.amount}
                  </td>

                  <td className="p-3 text-center">
                    {transaction.type}
                  </td>

                  <td className="p-3 text-center">
                    {transaction.category}
                  </td>

                  <td className="p-3 text-center">
                    {transaction.date}
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          editTransaction(transaction)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteTransaction(transaction.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
