# Blog Deletion Behavior

## Overview
The blog system supports cascading deletions to ensure data integrity across all languages and related content.

## 1. Delete Entire Blog

### What Happens:
When you delete a blog, the following occurs automatically:

1. **All Language Versions Deleted**
   - English version
   - Arabic version
   - Portuguese version
   - Chinese version
   - Japanese version

2. **All Detailed Sections Deleted (Cascade)**
   - All detailed sections belonging to this blog (across all languages)
   - Section images deleted from S3
   - Database cascade delete ensures no orphaned records

3. **Main Blog Image Deleted**
   - The main blog image is deleted from S3

### How to Delete:
- Go to `/admin-genix/dashboard/blogs`
- Click the **Delete** button on any blog
- Confirm the deletion
- All language versions and detailed sections are removed

### API Endpoint:
```
DELETE /api/blogs/[slug]
```

### Database Behavior:
```prisma
model DetailedBlog {
  blog Blog @relation("BlogDetails", fields: [blogId], references: [id], onDelete: Cascade)
  //                                                                      ^^^^^^^^^^^^^^^^
  //                                                    This ensures cascade delete
}
```

---

## 2. Delete Individual Detailed Section

### What Happens:
When you delete a detailed section from the edit page:

1. **All Language Versions of That Section Deleted**
   - The section is removed from all 5 languages
   - Not just the English version

2. **Section Images Deleted**
   - If the section has an image, it's deleted from S3

3. **Remaining Sections Reordered**
   - If you delete section #2 out of 4 sections:
     - Section #1 stays as #1
     - Section #3 becomes #2
     - Section #4 becomes #3
   - Order is automatically maintained

### How to Delete:
- Go to `/admin-genix/dashboard/blogs/edit/[slug]`
- Click the **Details Tab**
- Click **Remove** on any section
- Confirm the deletion
- The section is deleted from all languages

### API Endpoint:
```
DELETE /api/blogs/detailed/[blogId]/[order]
```

### Example:
If you have a blog with sections:
1. "Why Choose Us?" (order: 0)
2. "Our Services" (order: 1)
3. "Quality Guarantee" (order: 2)

And you delete "Our Services" (order: 1):
- "Why Choose Us?" stays at order: 0
- "Quality Guarantee" moves to order: 1

---

## 3. Important Notes

### Data Safety
✅ **Always confirms before deletion**
- Both blog and section deletions require user confirmation
- Warning message explains what will be deleted

✅ **Multi-language awareness**
- Users are informed that deletion affects all languages
- No orphaned translations left behind

✅ **Image cleanup**
- S3 images are automatically deleted
- No storage waste from deleted content

### Limitations
⚠️ **Cannot undo deletions**
- Once deleted, blog data cannot be recovered
- Make sure you want to delete before confirming

⚠️ **Auth required**
- Only authenticated admin users can delete blogs
- JWT token verification is enforced

---

## 4. Database Schema

### Blog Table
```prisma
model Blog {
  id              String   @id @default(cuid())
  slug            String
  languageId      String
  // ... other fields
  detailedBlogs   DetailedBlog[] @relation("BlogDetails")
}
```

### DetailedBlog Table
```prisma
model DetailedBlog {
  id         String   @id @default(cuid())
  blogId     String
  blog       Blog     @relation("BlogDetails", fields: [blogId], references: [id], onDelete: Cascade)
  languageId String
  // ... other fields
}
```

### Key Points:
- `onDelete: Cascade` on DetailedBlog ensures automatic cleanup
- When a blog is deleted, Prisma automatically deletes all related DetailedBlog records
- No manual cleanup needed for cascade relationships

---

## 5. Testing Deletion

### Test Blog Deletion:
1. Create a test blog with sections
2. Note the blog slug
3. Delete the blog from admin panel
4. Verify in database:
   ```sql
   -- Should return 0 rows
   SELECT * FROM blogs WHERE slug = 'your-test-slug';
   SELECT * FROM detailed_blogs WHERE blogId = 'your-blog-id';
   ```

### Test Section Deletion:
1. Edit a blog with multiple sections
2. Delete one section (e.g., section at order: 1)
3. Verify:
   - Section is removed from all languages
   - Remaining sections are reordered
   - Total section count decreased

---

## Summary

| Action | Deletes | Affects Languages | Reorders | S3 Cleanup |
|--------|---------|-------------------|----------|------------|
| Delete Blog | Blog + All Sections | All (5) | N/A | ✅ Blog + Section Images |
| Delete Section | One Section | All (5) | ✅ Yes | ✅ Section Image Only |

Both deletion methods are safe, multi-language aware, and maintain data integrity! 🎉
