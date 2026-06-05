function TransactionTable({
  transactions,
  deleteTransaction,
  editTransaction,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Transactions
      </h2>

      <table className="w-full border">
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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="p-3 text-center">
                {transaction.title}
              </td>

              <td className="p-3 text-center">
                ₹{transaction.amount}
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
                <button
                  onClick={() =>
                    editTransaction(transaction)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;