# Deshmukh Gym & Cardio — MERN

Simple production-style starter:
- React + Vite frontend
- Node + Express backend
- MongoDB + Mongoose
- JWT admin login
- Member CRUD/archive
- AC / Non-AC / Cardio
- 1/3/4 month memberships
- Automatic end dates
- Fees and payment records
- Dashboard and expiring list

## 1. Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

For macOS/Linux use `cp .env.example .env`.

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/deshmukh_gym
JWT_SECRET=change_this_to_a_long_random_secret
ADMIN_EMAIL=admin@deshmukhgym.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:5173
```

MongoDB can be local or MongoDB Atlas.

## 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

For macOS/Linux use `cp .env.example .env`.

Open http://localhost:5173

Admin: http://localhost:5173/admin/login

Default demo credentials:
- Email: admin@deshmukhgym.com
- Password: admin123

Change the password in `.env` before real deployment.

## Notes

The backend owns all member/payment data. The frontend never stores member data in localStorage.
The JWT is stored in localStorage for this simple starter. For higher-security production deployment, use an HttpOnly secure cookie, rate limiting, audit logging, HTTPS and backups.
