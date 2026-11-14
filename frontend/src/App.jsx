import { useCallback, useEffect, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import { getExpenses, getSummary, createExpense, updateExpense, deleteExpense } from './api'

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Other']

function App() {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState(null)
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    try {
      setError('')
      const [list, sum] = await Promise.all([
        getExpenses(filter || undefined),
        getSummary(),
      ])
      setExpenses(list)
      setSummary(sum)
    } catch (e) {
      setError('Cannot connect to backend. Is Spring Boot running on port 8080?')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateExpense(editing.id, data)
        setEditing(null)
      } else {
        await createExpense(data)
      }
      await loadData()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return
    try {
      await deleteExpense(id)
      await loadData()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleEdit = (expense) => {
    setEditing(expense)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => setEditing(null)

  return (
    <div className="app">
      <header className="header">
        <h1>Personal Expense Tracker</h1>
        <p>Track your daily spending — simple mini project</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <Summary summary={summary} />

      <div className="layout">
        <section className="panel">
          <h2>{editing ? 'Edit Expense' : 'Add Expense'}</h2>
          <ExpenseForm
            categories={CATEGORIES}
            initial={editing}
            onSave={handleSave}
            onCancel={editing ? handleCancelEdit : null}
          />
        </section>

        <section className="panel panel-wide">
          <div className="list-header">
            <h2>Expenses</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="muted">Loading...</p>
          ) : (
            <ExpenseList
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default App
