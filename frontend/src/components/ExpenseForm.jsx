import { useEffect, useState } from 'react'

const empty = {
  title: '',
  amount: '',
  category: 'Food',
  expenseDate: new Date().toISOString().slice(0, 10),
  description: '',
}

function ExpenseForm({ categories, initial, onSave, onCancel }) {
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        amount: initial.amount ?? '',
        category: initial.category || 'Food',
        expenseDate: initial.expenseDate || empty.expenseDate,
        description: initial.description || '',
      })
    } else {
      setForm(empty)
    }
  }, [initial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.amount || Number(form.amount) <= 0) {
      alert('Please enter a valid title and amount')
      return
    }
    onSave({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      expenseDate: form.expenseDate,
      description: form.description.trim(),
    })
    if (!initial) setForm({ ...empty, expenseDate: new Date().toISOString().slice(0, 10) })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Lunch"
          required
        />
      </label>

      <label>
        Amount (₹)
        <input
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input
          name="expenseDate"
          type="date"
          value={form.expenseDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional notes"
          rows={2}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initial ? 'Update' : 'Add Expense'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ExpenseForm
