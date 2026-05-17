# Lab 11 - MERN Stack Node MongoDB Ecommerce App

This lab contains a basic ecommerce application with separate backend and frontend folders.

## Project Structure

```text
Lab_11_MERN_Stack_Node_MongoDB_Lab/
  backend/   Node.js + Express.js + MongoDB API
  frontend/  Next.js + Tailwind CSS user interface
```

## Requirements

- Node.js LTS
- MongoDB Community Server or MongoDB Compass
- npm

## How to Run

### 1. Start MongoDB

Make sure MongoDB is running locally on:

```text
mongodb://127.0.0.1:27017
```

### 2. Run the Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

API endpoints:

```text
GET http://localhost:5000/
GET http://localhost:5000/api/products
GET http://localhost:5000/api/products/:id
```

### 3. Run the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

## Notes

- The backend uses the `ecommerce_lab11` MongoDB database.
- Run `npm run seed` in the backend folder to insert sample products.
- If the frontend cannot reach the backend, it will display a friendly error message.
