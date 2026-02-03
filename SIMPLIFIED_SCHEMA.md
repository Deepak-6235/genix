# Simplified Database Schema

## 🎯 New Structure

No more separate translation tables! Everything is in ONE `services` table with a `language` column.

### Database Structure

```
services table:
├── id (unique ID)
├── slug (service identifier - same for all languages)
├── language (en, ar, pt, zh, ja, de, fr)
├── icon (emoji or icon)
├── title (translated)
├── shortDescription (translated)
├── fullDescription (translated)
├── servicesProvided (translated)
├── targetInsects (translated)
├── methodsTitle (translated)
├── methodsDescription (translated)
├── advancedTechnologies (translated)
├── safeUseDescription (translated)
├── serviceGuarantee (translated)
├── isActive (boolean)
├── order (display order)
├── createdAt
└── updatedAt

UNIQUE CONSTRAINT: [slug, language] - Same slug can have multiple language rows
```

### Example Data

One service "Pest Control" stored as 5 rows (one per language):

```
Row 1 (English):
- id: abc123
- slug: pest-control
- language: en
- title: Pest Control
- shortDescription: Professional insect extermination
- icon: 🐜
- order: 0
- isActive: true

Row 2 (Arabic):
- id: abc124
- slug: pest-control
- language: ar
- title: مكافحة الآفات
- shortDescription: القضاء المهني على الحشرات
- icon: 🐜
- order: 0
- isActive: true

Row 3 (Portuguese):
- id: abc125
- slug: pest-control
- language: pt
- title: Controle de Pragas
- shortDescription: Exterminação profissional de insetos
- icon: 🐜
- order: 0
- isActive: true

Row 4 (Chinese):
- id: abc126
- slug: pest-control
- language: zh
- title: 害虫防制
- shortDescription: 专业害虫防控
- icon: 🐜
- order: 0
- isActive: true

Row 5 (Japanese):
- id: abc127
- slug: pest-control
- language: ja
- title: 害虫駆除
- shortDescription: プロの害虫駆除
- icon: 🐜
- order: 0
- isActive: true
```

## 🔄 API Flow

### Frontend → Backend

**User selects Arabic on website:**
```
Frontend: useLanguage() returns "ar"
Frontend: Makes API call to GET /api/services?lang=ar
```

**Backend processes:**
```
prisma.service.findMany({
  where: {
    language: "ar",
    isActive: true
  },
  orderBy: { order: 'asc' }
})
```

**Database returns:**
```
Only rows WHERE language='ar'
```

**Result:**
```json
{
  "success": true,
  "language": "ar",
  "services": [
    {
      "id": "abc124",
      "slug": "pest-control",
      "language": "ar",
      "title": "مكافحة الآفات",
      "shortDescription": "القضاء المهني على الحشرات",
      "icon": "🐜",
      ...
    }
  ]
}
```

## 🎯 How Admin Adding Service Works

### Step 1: Admin fills English content
```
Title: "Pest Control"
Short Description: "Professional insect elimination"
Full Description: "We provide comprehensive..."
...all fields in English
```

### Step 2: Click Save
```
Backend receives English content
Calls translateContent() function
Google Translate API translates to:
- Arabic
- Portuguese
- Chinese
- Japanese
```

### Step 3: Create 5 service records
```
CREATE services (English) - 1 record
CREATE services (Arabic) - 1 record
CREATE services (Portuguese) - 1 record
CREATE services (Chinese) - 1 record
CREATE services (Japanese) - 1 record
Total: 5 rows with same slug, different language
```

### Step 4: Database stores all
```
5 rows in services table
All with slug="pest-control"
Each with different language code
```

## 👀 How User Viewing Works

### Step 1: User visits website
```
Default language: English (from browser or localStorage)
API call: GET /api/services?lang=en
```

### Step 2: Database query
```sql
SELECT * FROM services
WHERE language='en' AND isActive=true
ORDER BY order ASC
```

### Step 3: Results returned
```
Only English services displayed
```

### Step 4: User switches to Arabic
```
Language changes to "ar"
API call: GET /api/services?lang=ar
```

### Step 5: Database query
```sql
SELECT * FROM services
WHERE language='ar' AND isActive=true
ORDER BY order ASC
```

### Step 6: Results returned
```
Only Arabic services displayed
All content in Arabic
```

## 📊 Benefits

✅ **Simpler Schema** - One table instead of two
✅ **Easier Queries** - Just filter by language
✅ **Faster Lookups** - Single table scan
✅ **Cleaner Code** - No joins needed
✅ **Auto-Translation** - All 5 languages created at once
✅ **Dynamic Content** - Filtered by language parameter

## 🔗 API Endpoints (Updated)

### Get Services
```
GET /api/services?lang=en
GET /api/services?lang=ar
GET /api/services?lang=pt
GET /api/services?lang=zh
GET /api/services?lang=ja
GET /api/services?lang=de
GET /api/services?lang=fr
```

Query returns only rows matching the language parameter.

### Get Single Service
```
GET /api/services/pest-control?lang=ar
```

Query filters by slug AND language:
```sql
SELECT * FROM services
WHERE slug='pest-control' AND language='ar'
```

### Create Service
```
POST /api/services
Body: {
  title: "Pest Control",
  shortDescription: "...",
  fullDescription: "...",
  ...
}
```

Backend automatically:
1. Translates to all 4 languages
2. Creates 5 service records (one per language)
3. All with same slug, different language

### Update Service
```
PUT /api/services/pest-control
Body: { title: "New Title", ... }
```

Backend:
1. Finds ALL records with slug="pest-control"
2. Updates ALL language versions
3. All get updated fields

### Delete Service
```
DELETE /api/services/pest-control
```

Backend:
1. Finds ALL records with slug="pest-control"
2. Deletes ALL language versions (all 5 rows)

### Reorder Services
```
POST /api/services/reorder
Body: {
  services: [
    { slug: "pest-control", order: 0 },
    { slug: "disinfection", order: 1 },
    { slug: "cleaning", order: 2 }
  ]
}
```

Backend:
1. For each slug, finds ALL language versions
2. Updates order for all language versions
3. All languages have same order

## 💾 Database Queries (Examples)

### Get all English services
```sql
SELECT * FROM services
WHERE language='en'
ORDER BY order ASC
```

### Get all Arabic services
```sql
SELECT * FROM services
WHERE language='ar'
ORDER BY order ASC
```

### Get all services for a slug (all languages)
```sql
SELECT * FROM services
WHERE slug='pest-control'
```

### Get specific service in specific language
```sql
SELECT * FROM services
WHERE slug='pest-control' AND language='ar'
```

### Update all language versions
```sql
UPDATE services
SET title='New Title'
WHERE slug='pest-control'
```

### Delete all language versions
```sql
DELETE FROM services
WHERE slug='pest-control'
```

## 🎯 Complete Example Flow

### Admin Adds Service
```
1. Fills English content for "Pest Control" service
2. Clicks Save
3. Backend creates 5 rows:
   - pest-control (en)
   - pest-control (ar)
   - pest-control (pt)
   - pest-control (zh)
   - pest-control (ja)
```

### User 1 - English
```
1. Visits website (default: English)
2. API: GET /api/services?lang=en
3. Database returns: pest-control (en) row
4. Sees: "Pest Control" in English
```

### User 2 - Arabic
```
1. Switches to Arabic
2. API: GET /api/services?lang=ar
3. Database returns: pest-control (ar) row
4. Sees: "مكافحة الآفات" in Arabic
```

### User 3 - Portuguese
```
1. Switches to Portuguese
2. API: GET /api/services?lang=pt
3. Database returns: pest-control (pt) row
4. Sees: "Controle de Pragas" in Portuguese
```

All coming from same slug, different language rows! ✨

## 📝 Summary

**Old Way:**
- 2 tables (services + service_translations)
- Complex joins
- Separate records for translations

**New Way:**
- 1 table (services with language column)
- Simple filter by language
- All data in one place
- Cleaner queries
- Easier to understand

Much simpler! 🚀
