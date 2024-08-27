# Cafe Application

Cafe application for managing cafes and employees, built using React.js, TypeScript, Node.js, and MySQL. The application allows users to view, add, edit, and delete cafes and employees through a simple web interface. The backend API handles data storage and retrieval, while the frontend provides an interactive user experience.

## Project Structure

### Frontend

- **React.js**: Used for building the user interface.
- **TypeScript**: Provides type safety.
- **Tanstack Query**: Manages server-state data.
- **Material-UI**: Provides pre-built UI components and styles (Maximum used own css).

### Backend

- **Node.js**: Handles server-side logic.
- **MySQL**: Used for database management.
- **Express.js**: Framework for building the REST API.

## Features

### Cafe Management

- **List Cafes**: Displays cafes with their details.
- **Filter by Location**: Filter cafes based on location.
- **Add/Edit Cafe**: Form to add or edit cafe information.
- **Delete Cafe**: Remove a cafe and its associated employees.
- **View Cafe**: View a cafe and its associated employees details.

### Employee Management

- **List Employees**: Displays employees with their details.
- **Add/Edit Employee**: Form to add or edit employee information.
- **Delete Employee**: Remove an employee from the database.
- **View Employee**: View a employee and its associated cafe shop name.

## Setup and Installation

### Prerequisites

- Node.js v18.x or above
- MySQL v8.x or above
- npm (Node Package Manager)

### Backend Setup

1. **Clone the Backend Repository:**

   ```bash
   git clone https://github.com/sfaizal88/my-cafe-backend.git
   cd my-cafe-backend
   ```

2. **Setup the Database:**

   - Navigate to the `database` folder and run the `db.sql` file in your MySQL database to create the required tables and database.

   - Update your MySQL database credentials in `src/config/dbConfig.js`. You can refer to the `.env` file for the original hostname, username, and password.

3. **Install Backend Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Backend Server:**

   ```bash
   node server.js
   ```

   - Note the port on which the server is running.

### Frontend Setup

1. **Clone the Frontend Repository:**

   ```bash
   git clone https://github.com/sfaizal88/my-cafe-frontend.git
   cd my-cafe-frontend
   ```

2. **Update API URL:**

   - In the `src/api/constants.ts` file, update the API URL with the backend server's port.

3. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Frontend Application:**

   ```bash
   npm run start
   ```

   - The application should now be running on `http://localhost:3000`.

## API Endpoints

- **GET /api/cafes/getAllCafeShop**: List cafes, optionally filter by location.
- **GET /api/employees/getAllEmployee**: List employees, optionally filter by cafe.
- **GET /api/cafes/getCafeShopDetailsById**: Get cafes details by Id
- **GET /api/employees/getEmployeeDetailsById**: Get employee details by Id
- **POST /api/cafes/createShopCafe**: Add a new cafe.
- **POST /api/employees/createEmployee**: Add a new employee.
- **PUT /api/cafes/updateShopCafe**: Update an existing cafe.
- **PUT /api/employees/updateEmployee**: Update an existing employee.
- **DELETE /api/cafes/deleteShopCafeById**: Delete a cafe and its employees.
- **DELETE /api/employees/deleteEmployeeById**: Delete an employee.

## Database Schema

The database consists of two primary tables:

1. **Employees**: Stores employee details such as ID, name, email, phone number, gender, and associated cafe.
2. **Cafes**: Stores cafe details such as ID, name, description, logo, and location.

## Documentation

For more detailed information on the system design, please refer to the [System Design Documentation](documentation/system-design.pdf).

## Screenshots

## Cafe shop
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="screenshot/employee-list.png" alt="Employee List" width="400"/>
    <img src="screenshot/employee-initail-form.png" alt="Employee Initial Form" width="400"/>
    <img src="screenshot/employee-form-error.png" alt="Employee Form Error" width="400"/>
    <img src="screenshot/employee-delete.png" alt="Employee Delete" width="400"/>
    <img src="screenshot/employee-edit.png" alt="Employee Edit" width="400"/>
    <img src="screenshot/employee-view.png" alt="Employee View" width="400"/>
</div>


## Employee screenshot
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="screenshot/cafe-shop-list.png" alt="Cafe Shop List" width="400"/>
    <img src="screenshot/cafe-shop-initial-form.png" alt="Cafe Shop Initial Form" width="400"/>
    <img src="screenshot/cafe-shop-form-error.png" alt="Cafe Shop Form Error" width="400"/>
    <img src="screenshot/cafe-shop-edit.png" alt="Cafe Shop Edit" width="400"/>
    <img src="screenshot/cafe-shop-view.png" alt="Cafe Shop View" width="400"/>
    <img src="screenshot/cafe-shop-delete.png" alt="Cafe Shop Delete" width="400"/>
</div>


## Notes

- Seed data is provided in the `db.sql` file.
- Validation is handled on both frontend and backend.
- Unsaved changes warning is implemented on the Add/Edit pages.