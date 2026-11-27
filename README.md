# Modern Haven

An online store for gadgets and clothing for the whole family: consoles, watches, and fitness gear
alongside men's, women's, and kids' fashion. Delivering in Lagos.

```
/        Storefront: Next.js 15, React 19, Tailwind CSS 4, NextAuth
/api     API: Node.js, Express 5, MongoDB (see api/README.md)
```

An admin console will be added later. The API already exposes the admin endpoints it will need.

## Running locally

1. **Start the API** (see [api/README.md](api/README.md) for details):

   ```bash
   cd api
   npm install
   cp .env.example .env    # set MONGODB_URI and JWT_SECRET
   npm run seed
   npm run dev             # http://localhost:5000
   ```

2. **Start the storefront** from the repo root:

   ```bash
   npm install
   cp .env.example .env.local   # set NEXTAUTH_SECRET
   npm run dev                  # http://localhost:4000
   ```

## Storefront environment

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_API_URL` | Where the API runs, e.g. `http://localhost:5000` |
| `NEXTAUTH_URL` | The storefront's own URL, e.g. `http://localhost:4000` |
| `NEXTAUTH_SECRET` | Long random string |

## Pages

Home, Shop (search, filters, sort), product pages, Cart, Checkout (delivery landmark + fee),
My orders, Men / Women / Kids & Teens, About, Contact, Log in, Sign up.

## CI

GitHub Actions runs the API tests and a storefront build on every pull request (`.github/workflows/ci.yml`).
