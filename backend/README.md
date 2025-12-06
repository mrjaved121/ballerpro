# BallerPro Backend

Express.js backend API server.

## Structure

- `src/` - Source code
  - `routes/` - API routes
  - `controllers/` - Route controllers
  - `middleware/` - Custom middleware
  - `models/` - Database models
  - `utils/` - Utility functions
  - `config/` - Configuration files
    - `env.ts` - Environment configuration
    - `db.ts` - Database connection

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your configuration

4. Start the server:
   ```bash
   npm start
   ```

## Development

- Express.js for REST API
- MongoDB with Mongoose
- TypeScript support
- JWT authentication

