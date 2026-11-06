
## Backend Folder Structure:

config/controllers/middleware/models/routes/utils/server.js/ .env/ .gitignore 



# Scholar Pathway (MERN) — Login and Register connected to MongoDB Atlas

**Your Future Starts Here!** A guidance platform for Sri Lankan O/L and A/L students.

This folder contains a working **login and register system**:

- **React (Vite) frontend** with Home, Login, Register, Student Dashboard and Institution (Partner) Dashboard pages.
- **Node.js + Express backend** with JWT authentication and role-based access.
- **MongoDB Atlas** database (through Mongoose).

> Status: prototype. Login and Register use the real backend. The dashboards, the AI Career Guide data and the course lists use sample data, and the eligibility rules are indicative only. They are **not verified admission requirements**.

---

## 1. Folder structure

```
scholar-pathway-auth/
├── README.md
├── server/                      # backend (Express + MongoDB)
│   ├── server.js                # starts the API
│   ├── seed.js                  # creates test institution + admin accounts
│   ├── .env.example             # copy to .env and fill in
│   ├── config/db.js             # connects to Atlas
│   ├── models/User.js           # user schema, password hashing
│   ├── controllers/authController.js   # register, login, me
│   ├── routes/authRoutes.js     # /api/auth/...
│   ├── middleware/auth.js       # protect + authorize (JWT, roles)
│   └── utils/validateRegister.js        # backend validation
└── client/                      # frontend (React + Vite)
    ├── .env.example             # copy to .env
    └── src/
        ├── main.jsx             # Router + AuthProvider
        ├── App.jsx              # all routes
        ├── api.js               # axios + token header + error messages
        ├── context/AuthContext.jsx      # login, register, logout, current user
        ├── components/ProtectedRoute.jsx # role-based page protection
        └── pages/
            ├── Home/            # Home, Navbar, Footer
            ├── Login/           # Login.jsx, Login.css
            ├── Register/        # Register.jsx, Register.css
            ├── Dashboard/       # Student dashboard (results -> matching options)
            └── Partner/         # Institution dashboard (sample data)
```

## 2. Requirements

- Node.js 18 or newer (`node -v`)
- A free MongoDB Atlas account
- Postman (optional, for testing the API)

## 3. Set up MongoDB Atlas

1. **Database Access** → Add New Database User. Choose a username and password.
   Avoid special characters such as `@ : / ?` in the password.
2. **Network Access** → Add IP Address. For development you can allow `0.0.0.0/0`
   (anywhere). Restrict this before going live.
3. **Database** → Connect → Drivers → copy the connection string.
4. Replace `<password>` with your password and add the database name before the `?`:

```
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/scholar_pathway?retryWrites=true&w=majority
```

## 4. Run the backend

```bash
cd server
cp .env.example .env        # then edit .env
npm install
npm run seed                # optional: creates test partner + admin accounts
npm run dev                 # http://localhost:5000
```

`server/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/scholar_pathway?retryWrites=true&w=majority
JWT_SECRET=a_long_random_text_at_least_32_characters
CLIENT_URL=http://localhost:5173
```

You should see:

```
MongoDB Atlas connected
API running on http://localhost:5000
```

Quick check: open `http://localhost:5000/api/health`. It should return `{"ok":true}`.

## 5. Run the frontend

Open a second terminal:

```bash
cd client
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
```

## 6. Test accounts

| Role | How to get it | Opens |
|---|---|---|
| Student | Create it on the **Register** page | `/dashboard` |
| Institution (partner) | `npm run seed` → `institute@demo.com` / `Institute123` | `/partner` |
| Admin | `npm run seed` → `admin@scholarpathway.lk` / `Admin12345` | `/admin` (page not built yet) |

These seed passwords are for testing only. Change them, and never run the seed on a real website.

## 7. How the flows work

- **I'm a student** (Home page) → `/dashboard`. If you are not logged in you are sent to `/login`, and after login you land on the Student Dashboard.
- **I'm an institution** → `/partner`, with the same rule.
- **Register** creates the account in Atlas, logs you in and opens the Student Dashboard.
- **Login** checks the email and password, then opens the page for your role:
  student → `/dashboard`, partner → `/partner`, admin → `/admin`.
- A student who opens `/partner` is sent back to `/dashboard` (and the other way round).
- **Logout** removes the saved token and returns to the Home page.

### Why institutions cannot register themselves

The Register page and API always create **student** accounts. The `role` field in a request is ignored,
so nobody can make themselves an admin or institution. Institution accounts should be created
by an admin after verification (the admin tools are a future step). For testing, use `npm run seed`.

## 8. API

Base URL: `http://localhost:5000/api`

| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | `/health` | public | server check |
| POST | `/auth/register` | public | create a student account |
| POST | `/auth/login` | public | log in |
| GET | `/auth/me` | token | current user (used when the site opens) |

### Register (Postman: Body → raw → JSON)

`POST /api/auth/register`

```json
{
  "name": "Nimali Perera",
  "email": "nimali@example.com",
  "password": "Pass1234",
  "phone": "0771234567",
  "educationLevel": "A/L Student",
  "district": "Colombo"
}
```

Responses: `201` (token + user), `400` (field errors), `409` (email already registered).

### Login

`POST /api/auth/login`

```json
{ "email": "nimali@example.com", "password": "Pass1234" }
```

Responses: `200` (token + user), `400` (missing fields), `401` (wrong email or password).

### Current user

`GET /api/auth/me` with the header `Authorization: Bearer <token>`.
In Postman: Authorization tab → Bearer Token → paste the token.

## 9. Security notes

- Passwords are hashed with bcrypt before saving. The password is never sent back.
- The backend validates every field again (the browser checks are only for convenience).
- Login and register are limited to 30 attempts per 15 minutes per address.
- Login uses the same message for a wrong email and a wrong password.
- `ProtectedRoute` only hides pages in the browser. Real protection is on the server:
  use `protect` and `authorize('partner')` / `authorize('admin')` on every future API route.
- The token is stored in `localStorage` for simplicity. A more secure option is an
  httpOnly cookie. Consider it before going live.
- Never commit `.env` files.

## 10. Troubleshooting

| Problem | Likely cause |
|---|---|
| `MongooseServerSelectionError` | your IP is not allowed in Atlas **Network Access** |
| `bad auth` / `Authentication failed` | wrong username or password in `MONGO_URI` |
| `Missing MONGO_URI in the .env file` | `.env` is missing or not inside `server/` |
| `Cannot use import statement` | `"type": "module"` missing in `server/package.json` |
| Login page says "Cannot reach the server" | backend not running, or wrong `VITE_API_URL` |
| Browser console shows a CORS error | `CLIENT_URL` in `server/.env` must match the frontend address exactly |
| 400 with empty fields in Postman | Body is not set to **raw + JSON** |
| Page keeps going to `/login` | token missing or expired. Log in again |
| Changed `.env` but nothing changed | restart the server (and the Vite dev server for the client) |

## 11. Not built yet

- Forgot password, email notifications
- Admin dashboard and partner verification
- Saving courses and results to the database (currently saved in the browser)
- AI Career Guide connected to a real AI service (current replies are scripted)
- Cloudinary image upload

## 12. Next steps

1. Save the student's O/L and A/L results in MongoDB instead of the browser.
2. Admin dashboard: create and verify institution accounts.
3. Move universities, courses and scholarships into collections with CRUD routes.
4. Connect the AI Career Guide to an AI API.
