function formatMoney(amount) {
  return Number(amount || 0).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  })
}

function Summary({ summary }) {
  if (!summary) return null

  const categories = Object.entries(summary.byCategory || {})

  return (
    <section className="summary">
      <div className="summary-card total">
        <span className="summary-label">Total Spent</span>
        <span className="summary-value">{formatMoney(summary.totalAmount)}</span>
        <span className="summary-meta">{summary.totalCount} expenses</span>
      </div>

      {categories.map(([name, amount]) => (
        <div key={name} className="summary-card">
          <span className="summary-label">{name}</span>
          <span className="summary-value">{formatMoney(amount)}</span>
        </div>
      ))}
    </section>
  )
}

export default Summary
