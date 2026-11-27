# Modern Haven API

REST API for the Modern Haven store (gadgets & clothing). Node.js, Express 5, MongoDB (Mongoose), JWT auth.
It serves the storefront in the repo root today and is built to back the admin console later.

## Getting started

```bash
cd api
npm install
cp .env.example .env      # then fill in MONGODB_URI and JWT_SECRET
npm run seed              # delivery zones + starter products (safe to re-run)
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-long-password' npm run create-admin
npm run dev               # http://localhost:5000
```

| Script | What it does |
|---|---|
| `npm run dev` | Start with auto-reload |
| `npm start` | Start for production |
| `npm test` | Run the test suite (uses an in-memory MongoDB, no setup needed) |
| `npm run seed` | Add any missing delivery zones and starter products |
| `npm run seed:reset` | **Delete all** products and delivery zones, then seed |
| `npm run create-admin` | Create an admin, or promote an existing account |
| `npm run email:preview` | Write the verification / reset emails to `api/email-preview-*.html` to view in a browser |

## Environment

| Variable | Required | Notes |
|---|---|---|
| `MONGODB_URI` | yes | `MONGODB_URL` also works |
| `JWT_SECRET` | yes | 32+ characters in production |
| `JWT_EXPIRES_IN` | no | Default `7d`. Keep in sync with the storefront session length |
| `PORT` | no | Default `5000` |
| `CORS_ORIGINS` | no | Comma-separated sites allowed to call the API from a browser |
| `APP_URL` | no | Storefront URL, used for links in emails |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | in production | Any SMTP provider (Gmail app password, Brevo, Resend, Mailgun…). Port 465 uses TLS, others STARTTLS |
| `MAIL_FROM` | no | e.g. `Modern Haven <no-reply@yourdomain.com>` |

Without SMTP settings, emails are printed to the console in development, and in production the
endpoints that send email answer 503, so sign-ups can't complete until SMTP is configured.

## Endpoints

Send `Authorization: Bearer <token>` for anything marked 🔒 (logged in) or 🛡️ (admin).
Errors look like `{ "error": "message", "details": { "field": ["problem"] } }`.

**Auth**: new accounts must confirm their email with a 6-digit code before they can log in.
Codes are emailed, expire after 10 minutes, allow 5 guesses, and can be re-sent every 60 seconds.
Some errors carry a `code` field to branch on: `EMAIL_NOT_VERIFIED`, `ALREADY_VERIFIED`, `OTP_INVALID`, `OTP_EXPIRED`, `OTP_COOLDOWN`.
- `POST /api/auth/register`: `{ firstName, lastName, email, phoneNumber?, password }` → `201 { email, verificationRequired: true }` and emails a code. Registering an email that isn't verified yet updates that account and re-sends the code
- `POST /api/auth/verify-email`: `{ email, code }` → `{ user, token }`
- `POST /api/auth/resend-verification`: `{ email }`
- `POST /api/auth/login`: `{ email, password }` → `{ user, token }`, or `403 EMAIL_NOT_VERIFIED`
- `POST /api/auth/forgot-password`: `{ email }` emails a reset code (same response whether or not the account exists)
- `POST /api/auth/reset-password`: `{ email, code, password }`. Also marks the email verified and invalidates tokens issued before the reset
- 🔒 `GET /api/auth/me`

Accounts created before email verification existed, and admins from `create-admin`, count as verified.

**Products**
- `GET /api/products`: filters `category` (`gadgets`|`clothing`), `audience` (`men`|`women`|`kids`|`unisex`), `subcategory`, `q`, `featured`, `minPrice`, `maxPrice`, `sort` (`newest`|`price-asc`|`price-desc`|`name`), `page`, `limit`
- `GET /api/products/categories`: product counts per category and audience
- `GET /api/products/:idOrSlug`
- 🛡️ `POST /api/products`, `PATCH /api/products/:id`, `DELETE /api/products/:id`

**Delivery zones** (the landmarks customers pick at checkout, each with its own fee)
- `GET /api/delivery-zones`
- 🛡️ `POST`, `PATCH /:id`, `DELETE /:id`

**Orders**: prices and delivery fees always come from the database, never the client. Stock is reserved when an order is placed and returned when it's cancelled.
- 🔒 `POST /api/orders`: `{ items: [{ productId, quantity }], delivery: { address, landmark, phoneNumber }, notes? }`
- 🔒 `GET /api/orders/mine`, `GET /api/orders/:id`, `POST /api/orders/:id/cancel` (pending orders only)

**Contact**
- `POST /api/contact`: `{ fullName, email, phoneNumber?, subject?, message }`

**Admin** (for the upcoming admin console) 🛡️
- `GET /api/admin/stats`: product, customer, order and revenue counts
- `GET /api/admin/orders?status=`, `PATCH /api/admin/orders/:id` `{ status?, paymentStatus? }`
- `GET /api/admin/users?role=&q=`, `PATCH /api/admin/users/:id/role`
- `GET /api/admin/messages?unread=true`, `PATCH /api/admin/messages/:id` `{ isRead }`

## Deploying

**Vercel** (current setup): a separate Vercel project with `api` as its root directory. `api/index.js` is the
serverless entry and `vercel.json` routes every path to it. From this folder: `vercel --prod`.
Set the environment variables above in that project (`NODE_ENV=production`), and in MongoDB Atlas allow
access from anywhere (`0.0.0.0/0`), since Vercel has no fixed IPs.

Otherwise any Node 20+ host works (Render, Railway, Fly.io, a VPS). Set the environment variables above,
use `npm start` as the start command and `api` as the root directory, and add your storefront's URL to `CORS_ORIGINS`.
A free MongoDB Atlas cluster is enough to start.
