# TransitOps

Transit Operations Management Platform. Manage vehicles, drivers, trips, maintenance, and expenses.

## Repository Structure

This repository is a monorepo separated into `frontend` and `backend`.

- `frontend/`: React + Vite + Tailwind CSS + React Router + Axios
- `backend/`: Python FastAPI + MongoDB + JWT auth

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- MongoDB (running locally or via Atlas)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The API will run on `http://localhost:8000` (Swagger UI at `/docs`).

## Commit Guidelines
Ensure you do not commit any `node_modules/`, `__pycache__/`, `venv/`, or `.env` files.
