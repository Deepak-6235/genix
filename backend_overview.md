# Backend Architecture & Database Guide

This documentation outlines the backend infrastructure of the **Genix** application. The backend is tightly integrated with the Next.js frontend, using API Routes for server-side logic and Prisma for database interactions.

## 1. Technology Stack

- **Runtime**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (Serverless logic).
- **ORM**: [Prisma](https://www.prisma.io/) - Type-safe database client.
- **Database**: PostgreSQL - Relational database engine.
- **Validation**: TypeScript & simple runtime checks.

## 2. Database Schema (Prisma)

The database schema is defined in `prisma/schema.prisma`. A key design pattern in this application is **Multi-language Support**.

### 2.1 Language Management
The core model is `Language`.
- **Fields**: `code` (e.g., 'en', 'ar'), `dir` ('ltr', 'rtl').
- **Role**: All content models relate back to a specific `Language` via `languageId`.

### 2.2 Content Models
Content tables (like `Service`, `Blog`) generally follow this pattern:
- **`slug`**: A shared identifier for the logical resource (e.g., "pest-control").
- **`languageId`**: The language this specific record is for.
- **Unique Constraint**: `@@unique([slug, languageId])`. This means we store a separate row for *each language version* of a service or blog.

**Example: `Service` Model**
```prisma
model Service {
  id               String   @id @default(cuid())
  slug             String   // "pest-control"
  languageId       String   // Link to Language table
  
  // Localized Content
  name             String   // "Pest Control" (en) or "مكافحة الحشرات" (ar)
  shortDescription String
  
  // Common Meta
  imageUrl         String?
}
```

### 2.3 Other Key Models
- **`Admin`**: For dashboard authentication.
- **`ContactFormSubmission`**: Stores user inquiries.
- **`DetailedBlog`**: Supports rich content for blog posts, broken down into sections.

## 3. API Structure

The backend logical layer resides in `app/api/`. Each folder contains a `route.ts` file corresponding to an endpoint.

### Directory Layout
```
app/api/
├── services/
│   ├── route.ts          # GET /api/services (List all)
│   └── [slug]/
│       └── route.ts      # GET /api/services/:slug (Get specific)
├── blogs/                # Blog management
├── contact-form-submissions/ # POST endpoint for contact forms
└── languages/            # Language config endpoints
```

### Standard Route Pattern
Most `GET` routes follow this logic:
1. Extract `lang` query parameter (default to 'en').
2. Lookup `Language` ID from the database using the code.
3. Query the content table (e.g., `Service`) filtering by `languageId`.

**Example Code (`GET /api/services`):**
```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  
  // 1. Find Language
  const language = await prisma.language.findUnique({ where: { code: lang } });
  
  // 2. Fetch Data
  const services = await prisma.service.findMany({
    where: { languageId: language.id, isActive: true },
    orderBy: { order: 'asc' }
  });
  
  return NextResponse.json({ success: true, services });
}
```

## 4. Workflows

### Database Seeding
Initial data (languages, default services) is populated using `prisma/seed.ts`.
- **Command**: `npm run db:seed`
- **Process**: Upserts languages first, then iterates through data arrays to create/update services and blogs for each language.

### Making Schema Changes
1. Modify `prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name <migration_name>` to apply changes to the local DB and generate a migration file.
3. Run `npx prisma generate` to update the TypeScript client.

### Adding a New API Endpoint
1. Create a folder: `app/api/my-feature/`.
2. Add `route.ts`.
3. Export `GET`, `POST`, etc., functions.
4. Use `prisma` import to interact with the DB.

## 5. Security & Validation
- **Authentication**: Admin routes should check for session tokens (implementation details in `api/auth` or middleware).
- **Validation**: Ensure `slug` and required fields are present before database writes.
- **Sanitization**: Prisma handles SQL injection protection automatically.

This architecture ensures a clean separation of concerns while keeping the backend logic essentially serverless and scalable.
