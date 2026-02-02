# Genix Admin Panel

A modern, secure admin panel built with Next.js 16, TypeScript, Prisma, and PostgreSQL.

## Features

- 🔐 Secure authentication with JWT & bcrypt
- 🗄️ PostgreSQL database with Prisma ORM
- 🎨 Beautiful UI with Tailwind CSS
- 🛡️ Rate limiting & brute force protection
- 📱 Responsive design
- ⚡ Built with Next.js App Router

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Follow the [DATABASE_SETUP.md](./DATABASE_SETUP.md) guide to:
- Install PostgreSQL
- Configure DATABASE_URL
- Run migrations
- Seed admin user

**Quick commands:**
```bash
npm run db:generate  # Generate Prisma Client
npm run db:push      # Create database tables
npm run db:seed      # Create default admin
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/admin-genix`

**Default Login:**
- Email: `admin@genix.com`
- Password: `Admin@123!`

## Project Structure

```
genix/
├── app/
│   ├── admin-genix/           # Admin login page
│   │   └── dashboard/         # Protected admin panel
│   └── api/auth/              # Authentication API routes
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── password.ts            # Password hashing utilities
│   └── auth.ts                # Auth helper functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeder
├── middleware.ts              # Route protection
└── .env.local                 # Environment variables
```

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/genix_db"
JWT_SECRET="your-super-secret-jwt-key"
NODE_ENV="development"
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:migrate   # Create and run migrations
npm run db:seed      # Seed database with admin user
npm run db:studio    # Open Prisma Studio (database GUI)
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Authentication:** JWT (jose) + bcrypt
- **Runtime:** Node.js

## Security

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT tokens with 24-hour expiration
- ✅ HTTP-only cookies (XSS protection)
- ✅ Rate limiting (5 attempts / 15 min lockout)
- ✅ Timing attack protection
- ✅ Email validation
- ✅ Secure cookies (HTTPS in production)

## Documentation

- [Database Setup Guide](./DATABASE_SETUP.md) - Complete database setup instructions
- [Authentication Documentation](./AUTH_SETUP.md) - Detailed auth system docs

## License

Private
