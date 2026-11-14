package com.expense.tracker.repository;

import com.expense.tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByCategoryIgnoreCase(String category);

    List<Expense> findAllByOrderByExpenseDateDesc();

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> getSumByCategory();

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e")
    Double getTotalAmount();
}
