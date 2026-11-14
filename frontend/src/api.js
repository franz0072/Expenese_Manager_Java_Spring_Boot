const API_BASE = 'http://localhost:8080/api/expenses'

export async function getExpenses(category) {
  const url = category ? `${API_BASE}?category=${encodeURIComponent(category)}` : API_BASE
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch expenses')
  return res.json()
}

export async function getSummary() {
  const res = await fetch(`${API_BASE}/summary`)
  if (!res.ok) throw new Error('Failed to fetch summary')
  return res.json()
}

export async function createExpense(expense) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to create expense')
  }
  return res.json()
}

export async function updateExpense(id, expense) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })
  if (!res.ok) throw new Error('Failed to update expense')
  return res.json()
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete expense')
}
