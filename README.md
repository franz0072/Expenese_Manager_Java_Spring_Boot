# Personal Expense Tracker

Simple mini project using **Java Spring Boot**, **MySQL**, and **React**.

## Features

- Add, edit, and delete expenses
- Filter by category (Food, Travel, Bills, Shopping, Other)
- Summary: total spent and totals by category

## Project structure

```
Personal Expense Tracker/
├── backend/     # Spring Boot REST API
└── frontend/    # React (Vite) UI
```

## Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8+
- Node.js 18+

## 1. Database setup

Start MySQL, then either create the database manually:

```sql
CREATE DATABASE expense_db;
```

Or rely on `createDatabaseIfNotExist=true` in `application.properties`.

Update credentials in:

`backend/src/main/resources/application.properties`

```properties
spring.datasource.username=root
spring.datasource.password=root
```

Change `root` / `root` to your MySQL username and password.

## 2. Run backend

```bash
cd backend
mvn spring-boot:run
```

API runs at: http://localhost:8080

### API endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/expenses` | List all expenses |
| GET | `/api/expenses?category=Food` | Filter by category |
| GET | `/api/expenses/{id}` | Get one expense |
| GET | `/api/expenses/summary` | Totals summary |
| POST | `/api/expenses` | Create expense |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |

### Sample POST body

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "expenseDate": "2026-03-13",
  "description": "College canteen"
}
```

## 3. Run frontend

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

## Tech stack

| Layer | Technology |
|-------|------------|
| Backend | Spring Boot 3, Spring Data JPA |
| Database | MySQL |
| Frontend | React 18, Vite |

## Notes for viva / report

- Layered architecture: Controller → Service → Repository → Entity
- REST APIs for CRUD
- React calls backend via `fetch`
- CORS enabled for the Vite dev server
