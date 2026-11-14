package com.expense.tracker.service;

import com.expense.tracker.model.Expense;
import com.expense.tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAllByOrderByExpenseDateDesc();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense updated) {
        Expense existing = getExpenseById(id);
        existing.setTitle(updated.getTitle());
        existing.setAmount(updated.getAmount());
        existing.setCategory(updated.getCategory());
        existing.setExpenseDate(updated.getExpenseDate());
        existing.setDescription(updated.getDescription());
        return expenseRepository.save(existing);
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }

    public List<Expense> getByCategory(String category) {
        return expenseRepository.findByCategoryIgnoreCase(category);
    }

    public Map<String, Object> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        Double total = expenseRepository.getTotalAmount();
        summary.put("totalAmount", total != null ? total : 0.0);
        summary.put("totalCount", expenseRepository.count());

        Map<String, Double> byCategory = new HashMap<>();
        for (Object[] row : expenseRepository.getSumByCategory()) {
            byCategory.put((String) row[0], (Double) row[1]);
        }
        summary.put("byCategory", byCategory);
        return summary;
    }
}
