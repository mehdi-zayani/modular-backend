# Modular Backend

A modular Node.js backend using Express and PostgreSQL.  
Designed for testing and prototyping frontend features with a realistic job management module.

## Features

- PostgreSQL integration with Docker
- RESTful jobs module (CRUD + pagination)
- Repository → Service → Controller → Routes architecture
- Configurable via `.env`
- Ready for future features: authentication, filtering, and multiple modules

## Getting Started

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- npm or yarn

### Installation

```bash
git clone https://github.com/mehdi-zayani/modular-backend.git
cd modular-backend
npm install
```

### Environment

Create a .env file based on .env.example:
```ini
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_DB=modular_backend
PORT=3000
```
### Run PostgreSQL with Docker
```bash
docker compose up -d
```

### Run Backend
- Development:
```bash
npm run dev
```
- Production
```bash
npm start
```
### API Endpoints (Jobs Module)

| Method | Endpoint  | Description                 |
| ------ | --------- | --------------------------- |
| GET    | /jobs     | List jobs (with pagination) |
| GET    | /jobs/:id | Get job by ID               |
| POST   | /jobs     | Create a new job            |
| PUT    | /jobs/:id | Update a job                |
| DELETE | /jobs/:id | Delete a job                |


### Example Job JSON

```json
{
  "title": "Fullstack Developer",
  "company": "Capgemini",
  "location": "Paris, France",
  "employment_type": "CDI",
  "seniority_level": "Mid",
  "remote": true,
  "salary_min": 3000,
  "salary_max": 4500,
  "currency": "EUR",
  "experience_min": 3,
  "skills": ["JavaScript", "Node.js", "Angular", "Docker", "PostgreSQL"],
  "description": "Work on enterprise applications and internal tools..."
}
```