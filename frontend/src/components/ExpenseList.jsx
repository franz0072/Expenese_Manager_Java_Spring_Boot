function formatMoney(amount) {
  return Number(amount).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  })
}

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return <p className="muted">No expenses yet. Add your first one!</p>
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.expenseDate}</td>
              <td>
                <div className="title-cell">{e.title}</div>
                {e.description && <div className="desc-cell">{e.description}</div>}
              </td>
              <td>
                <span className={`badge badge-${e.category.toLowerCase()}`}>
                  {e.category}
                </span>
              </td>
              <td className="amount">{formatMoney(e.amount)}</td>
              <td className="actions">
                <button className="btn btn-sm" onClick={() => onEdit(e)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(e.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseList
