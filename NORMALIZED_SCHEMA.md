# Normalized Database Schema with Languages Table

## ✨ What Changed

Instead of just a `language` string column, we now have a separate `languages` table that can be reused across multiple other tables in the future.

---

## 📊 Database Structure

### Languages Table (Reusable)
```
languages table:
├── id (unique ID)
├── code (unique: 'en', 'ar', 'pt', 'zh', 'ja', 'de', 'fr')
├── name ('English', 'Arabic', 'Portuguese', etc.)
├── nativeName ('English', 'العربية', 'Português', etc.)
├── flag ('🇬🇧', '🇸🇦', '🇵🇹', etc.)
├── dir ('ltr' or 'rtl')
├── isActive (boolean)
├── createdAt
└── updatedAt
```

### Services Table (Using Language Foreign Key)
```
services table:
├── id (unique ID)
├── slug (service identifier)
├── languageId (foreign key → languages.id)
├── language (relation to Language table)
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

UNIQUE CONSTRAINT: [slug, languageId]
```

---

## 📋 Example Data Structure

### Languages Table (7 records)
```
Record 1: id=lang-en, code=en, name=English, nativeName=English, flag=🇬🇧, dir=ltr
Record 2: id=lang-ar, code=ar, name=Arabic, nativeName=العربية, flag=🇸🇦, dir=rtl
Record 3: id=lang-pt, code=pt, name=Portuguese, nativeName=Português, flag=🇵🇹, dir=ltr
Record 4: id=lang-zh, code=zh, name=Chinese, nativeName=中文, flag=🇨🇳, dir=ltr
Record 5: id=lang-ja, code=ja, name=Japanese, nativeName=日本語, flag=🇯🇵, dir=ltr
Record 6: id=lang-de, code=de, name=German, nativeName=Deutsch, flag=🇩🇪, dir=ltr
Record 7: id=lang-fr, code=fr, name=French, nativeName=Français, flag=🇫🇷, dir=ltr
```

### Services Table (5 records for one service)
```
Record 1 (English):
- id: svc-001
- slug: pest-control
- languageId: lang-en
- title: Pest Control
- shortDescription: Professional insect extermination
- icon: 🐜
- order: 0
- isActive: true

Record 2 (Arabic):
- id: svc-002
- slug: pest-control
- languageId: lang-ar
- title: مكافحة الآفات
- shortDescription: القضاء المهني على الحشرات
- icon: 🐜
- order: 0
- isActive: true

Record 3 (Portuguese):
- id: svc-003
- slug: pest-control
- languageId: lang-pt
- title: Controle de Pragas
- shortDescription: Exterminação profissional de insetos
- icon: 🐜
- order: 0
- isActive: true

Record 4 (Chinese):
- id: svc-004
- slug: pest-control
- languageId: lang-zh
- title: 害虫防制
- shortDescription: 专业害虫防控
- icon: 🐜
- order: 0
- isActive: true

Record 5 (Japanese):
- id: svc-005
- slug: pest-control
- languageId: lang-ja
- title: 害虫駆除
- shortDescription: プロの害虫駆除
- icon: 🐜
- order: 0
- isActive: true
```

---

## 🔄 API Flow with Languages Table

### Frontend Request
```
User selects Arabic
Frontend: GET /api/services?lang=ar
```

### Backend Processing
```javascript
// First, find language ID for 'ar'
const language = await prisma.language.findUnique({
  where: { code: 'ar' }
});

// Then fetch services for that language
const services = await prisma.service.findMany({
  where: {
    languageId: language.id,
    isActive: true,
  },
  orderBy: { order: 'asc' },
});
```

### Database Query
```sql
SELECT s.* FROM services s
JOIN languages l ON s.languageId = l.id
WHERE l.code = 'ar' AND s.isActive = true
ORDER BY s.order ASC
```

### API Response
```json
{
  "success": true,
  "language": "ar",
  "services": [
    {
      "id": "svc-002",
      "slug": "pest-control",
      "languageId": "lang-ar",
      "title": "مكافحة الآفات",
      "shortDescription": "القضاء المهني على الحشرات",
      ...
    }
  ]
}
```

---

## ✨ Benefits of Separate Languages Table

### 1. **Reusability**
You can use the same languages table in future tables:
```
- Blog translations
- FAQ translations
- Pages translations
- Products translations
- Any other translated content
```

### 2. **Central Management**
All language data in one place:
```
- Can add/remove languages globally
- Can change language settings (RTL, flag, etc.) in one place
- All tables that use this language instantly get the update
```

### 3. **Data Integrity**
- Foreign key constraint ensures only valid languages are used
- Can't accidentally create a service with invalid language

### 4. **Query Flexibility**
```sql
-- Get all services in Arabic
SELECT * FROM services WHERE languageId = 'lang-ar'

-- Get all services with their language info
SELECT s.*, l.name, l.flag FROM services s
JOIN languages l ON s.languageId = l.id

-- Get languages used across all services
SELECT DISTINCT l.* FROM languages l
JOIN services s ON l.id = s.languageId
```

### 5. **Future-Proof**
Easy to add more features per language:
```
- Language-specific currencies
- Language-specific templates
- Language-specific SEO rules
- Language-specific holidays/restrictions
```

---

## 🎯 Complete Example Flow

### Admin Adds Service
```
1. Fills English content
2. System auto-translates
3. Creates 5 service rows:
   - pest-control (languageId: lang-en)
   - pest-control (languageId: lang-ar)
   - pest-control (languageId: lang-pt)
   - pest-control (languageId: lang-zh)
   - pest-control (languageId: lang-ja)
```

### User 1 - English
```
1. Makes request: GET /api/services?lang=en
2. Backend finds: languageId where language.code = 'en'
3. Queries: SELECT * FROM services WHERE languageId = 'lang-en'
4. Receives: English services
5. Sees: "Pest Control" in English
```

### User 2 - Arabic
```
1. Makes request: GET /api/services?lang=ar
2. Backend finds: languageId where language.code = 'ar'
3. Queries: SELECT * FROM services WHERE languageId = 'lang-ar'
4. Receives: Arabic services
5. Sees: "مكافحة الآفات" in Arabic
6. Layout changes to RTL (from language.dir = 'rtl')
```

---

## 📝 API Endpoints (Updated)

### Get Services in Language
```
GET /api/services?lang=en
GET /api/services?lang=ar
GET /api/services?lang=pt
GET /api/services?lang=zh
GET /api/services?lang=ja
GET /api/services?lang=de
GET /api/services?lang=fr
```

### Get Single Service
```
GET /api/services/pest-control?lang=ar
```

### Create Service
```
POST /api/services
Body: {
  title: "Pest Control",
  shortDescription: "...",
  ...
}
```
- Auto-translates all 5 languages
- Creates 5 service records
- Each with correct languageId

### Update Service
```
PUT /api/services/pest-control
Body: { title: "New Title", ... }
```
- Finds all services with slug
- Updates all language versions

### Delete Service
```
DELETE /api/services/pest-control
```
- Deletes all language versions (all 5 rows)

---

## 🚀 Future Enhancements

With this structure, you can easily add:

```
// Blog Posts with translations
model BlogPost {
  id String @id
  slug String
  languageId String
  language Language @relation(fields: [languageId], references: [id])
  title String
  content String
  ...
  @@unique([slug, languageId])
}

// FAQ with translations
model FAQ {
  id String @id
  languageId String
  language Language @relation(fields: [languageId], references: [id])
  question String
  answer String
  ...
}

// Testimonials with translations
model Testimonial {
  id String @id
  languageId String
  language Language @relation(fields: [languageId], references: [id])
  clientName String
  content String
  ...
}
```

All using the same `languages` table!

---

## 💾 Summary

**Old Approach:**
```
services table with language string column
- Simple but not reusable
- Language info scattered in each table
```

**New Normalized Approach:**
```
Separate languages table
Services table with foreign key to languages
- Reusable across all content tables
- Central language management
- Better data integrity
- More flexible queries
```

Much better for a scalable system! 🎯
