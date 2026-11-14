# Personal Expense Tracker — Project Notes

Mini project using **Java Spring Boot**, **MySQL**, and **React**.

---

## 1. What to Install

| Software | Purpose | Suggested version |
|----------|---------|-------------------|
| **JDK (Java)** | Run Spring Boot backend | Java 17 or above |
| **Maven** | Build & run Spring Boot project | 3.8+ |
| **MySQL** | Store expense data | MySQL 8+ |
| **Node.js** | Run React frontend (includes npm) | 18+ |
| **IDE (optional)** | Code editing / run from IDE | IntelliJ IDEA, Eclipse, VS Code, Cursor |

### Also needed
- MySQL running as a Windows service (or MySQL Workbench to manage DB)
- Browser (Chrome / Edge / Firefox) to open the UI

---

## 2. Tools / Tech Stack Used

### Backend
| Tool | Role |
|------|------|
| **Spring Boot 3** | Main framework for REST API |
| **Spring Web** | Controllers & HTTP endpoints |
| **Spring Data JPA** | Database access without writing raw SQL for CRUD |
| **Hibernate** | JPA implementation (maps Java objects ↔ tables) |
| **MySQL Connector/J** | JDBC driver to connect to MySQL |
| **Maven** | Dependency management & build |
| **Validation** | `@NotBlank`, `@Positive` on entity fields |

### Frontend
| Tool | Role |
|------|------|
| **React 18** | UI components |
| **Vite** | Fast frontend build / dev server |
| **fetch API** | Call backend REST APIs |
| **CSS** | Simple styling |

### Database
| Tool | Role |
|------|------|
| **MySQL** | Relational database (`expense_db`) |
| **Table: expenses** | Stores id, title, amount, category, date, description |

---

## 3. How to Run (Local)

### Step A — Configure MySQL password

Open:

`backend/src/main/resources/application.properties`

Set your MySQL username/password, for example:

```properties
spring.datasource.username=root
spring.datasource.password=Innovate123
```

If password is empty:

```properties
spring.datasource.password=
```

Database `expense_db` is created automatically if it does not exist (`createDatabaseIfNotExist=true`).

### Step B — Start backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Backend URL: **http://localhost:8080**

### Step C — Start frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: **http://localhost:5173**

### Step D — Use the app

1. Open http://localhost:5173  
2. Add expenses (title, amount, category, date)  
3. Edit / delete from the list  
4. View totals in the summary cards  

### If `java` or `mvn` is not recognized
- Install JDK 17 and Maven, **or**
- Run `ExpenseTrackerApplication` from IntelliJ / Eclipse  
- Add Java and Maven `bin` folders to Windows PATH  

---

## 4. Working Flow (How the App Works)

```
User (Browser)
    │
    │  clicks Add / Edit / Delete
    ▼
React Frontend (port 5173)
    │
    │  HTTP request (JSON) via fetch
    │  e.g. POST /api/expenses
    ▼
Spring Boot REST Controller
    │
    │  validates & calls service
    ▼
ExpenseService (business logic)
    │
    │  uses repository methods
    ▼
ExpenseRepository (Spring Data JPA)
    │
    │  Hibernate / JDBC
    ▼
MySQL Database (expense_db → expenses table)
```

### Layered architecture (backend)

1. **Controller** (`ExpenseController`) — receives HTTP requests, returns JSON  
2. **Service** (`ExpenseService`) — business logic (create, update, delete, summary)  
3. **Repository** (`ExpenseRepository`) — talks to DB  
4. **Entity / Model** (`Expense`) — maps to `expenses` table  

### Main API endpoints

| Method | Endpoint | Action |
|--------|----------|--------|
| GET | `/api/expenses` | List all expenses |
| GET | `/api/expenses?category=Food` | Filter by category |
| GET | `/api/expenses/{id}` | Get one expense |
| GET | `/api/expenses/summary` | Total + by category |
| POST | `/api/expenses` | Create expense |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |

### Sample JSON (create expense)

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "expenseDate": "2026-03-13",
  "description": "College canteen"
}
```

### CORS
Frontend (5173) and backend (8080) are different origins, so CORS is enabled so the browser allows API calls.

---

## 5. Project Summary

**Personal Expense Tracker** is a full-stack mini project to record and manage daily expenses.

- Users can **add, edit, delete**, and **filter** expenses by category (Food, Travel, Bills, Shopping, Other).  
- A **summary** shows total spent and amount per category.  
- Backend is a **Spring Boot REST API** with **JPA** persistence in **MySQL**.  
- Frontend is a **React** single-page UI that consumes those APIs.  
- Suitable for college mini project / viva — clear MVC-style layers and CRUD operations.

### Project folders

```
Personal Expense Tracker/
├── backend/          Spring Boot API
│   └── src/main/java/com/expense/tracker/
│       ├── model/          Expense entity
│       ├── repository/     JPA repository
│       ├── service/        Business logic
│       ├── controller/     REST APIs
│       └── config/         CORS config
└── frontend/         React + Vite UI
    └── src/
        ├── App.jsx
        ├── api.js
        └── components/     Form, List, Summary
```

---

## 6. Interview Questions & Answers

### Q1. What is this project about?
**A:** It is a Personal Expense Tracker where a user can add, update, delete, and view expenses stored in MySQL. The UI is React; the backend is Spring Boot REST APIs.

### Q2. Why did you choose Spring Boot?
**A:** Spring Boot makes it easy to create REST APIs quickly with less configuration. It has built-in support for web, JPA, and validation, and integrates well with MySQL.

### Q3. What is JPA / Hibernate?
**A:** JPA is a Java specification for mapping Java objects to database tables (ORM). Hibernate is the implementation. We use `@Entity` on `Expense` and Spring Data repositories instead of writing most SQL manually.

### Q4. Explain the layers in your backend.
**A:**  
- **Controller** — handles HTTP requests/responses  
- **Service** — business logic  
- **Repository** — database operations  
- **Entity** — table structure as a Java class  

This separation makes code cleaner and easier to maintain.

### Q5. What is REST API?
**A:** REST is a style of web services using HTTP methods:  
- GET → read  
- POST → create  
- PUT → update  
- DELETE → remove  

Data is exchanged as JSON.

### Q6. How does the frontend talk to the backend?
**A:** React uses the `fetch` API to call URLs like `http://localhost:8080/api/expenses`. Requests send/receive JSON. CORS is configured so the browser allows these cross-origin calls.

### Q7. What is CORS and why is it needed?
**A:** CORS (Cross-Origin Resource Sharing) is a browser security feature. Our frontend runs on port 5173 and backend on 8080 (different origins). Without CORS headers, the browser blocks the API calls.

### Q8. How is data stored?
**A:** In MySQL database `expense_db`, table `expenses`, with columns: id, title, amount, category, expense_date, description. Hibernate creates/updates the table using `ddl-auto=update`.

### Q9. What is `spring.jpa.hibernate.ddl-auto=update`?
**A:** It tells Hibernate to update the database schema based on entity classes. Useful in development. For production, `validate` or migrations (Flyway/Liquibase) are preferred.

### Q10. Difference between PUT and POST?
**A:**  
- **POST** creates a new resource (`/api/expenses`)  
- **PUT** updates an existing resource (`/api/expenses/{id}`)  

### Q11. How do you calculate expense summary?
**A:** The service uses repository queries: sum of all amounts, count of expenses, and `GROUP BY category` to get totals per category. Frontend displays these in summary cards.

### Q12. What validation did you use?
**A:** Bean Validation annotations on the entity, e.g. `@NotBlank` for title/category, `@Positive` for amount, `@NotNull` for date. Invalid requests return HTTP 400.

### Q13. What happens when you click “Add Expense”?
**A:**  
1. Form data is collected in React  
2. `POST /api/expenses` is called with JSON  
3. Controller validates and passes to service  
4. Service saves via repository  
5. MySQL inserts a row  
6. Frontend reloads list and summary  

### Q14. Can this project be extended?
**A:** Yes — login/authentication, monthly budgets, charts, export to Excel/PDF, multi-user support, dark mode, etc.

### Q15. Difference between frontend and backend ports?
**A:**  
- Frontend (Vite): **5173** — UI  
- Backend (Spring Boot): **8080** — API  

They run as separate processes and communicate over HTTP.

### Q16. What is Maven used for?
**A:** Maven manages project dependencies (Spring, MySQL driver, etc.) from `pom.xml` and provides commands like `mvn spring-boot:run` to build and run the app.

### Q17. What is an Entity?
**A:** A Java class annotated with `@Entity` that maps to a database table. Each object instance corresponds to one row; fields map to columns.

### Q18. Why use React instead of plain HTML?
**A:** React makes UI interactive with components and state. When data changes (add/edit/delete), the list and summary update without full page reloads.

### Q19. What categories does the app support?
**A:** Food, Travel, Bills, Shopping, Other (simple fixed list for the mini project).

### Q20. What is the main advantage of this architecture?
**A:** Clear separation of concerns — UI, API, business logic, and database are separate. Easy to test, explain in viva, and extend later.

---

## Quick Checklist for Demo / Viva

1. MySQL service is running  
2. Password in `application.properties` is correct  
3. Backend started → http://localhost:8080  
4. Frontend started → http://localhost:5173  
5. Show: add expense → appears in list → summary updates → edit → delete  
6. Explain: Controller → Service → Repository → MySQL flow  

---

*End of notes — Personal Expense Tracker mini project*
