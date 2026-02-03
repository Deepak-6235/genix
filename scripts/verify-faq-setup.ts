/**
 * Verification script for FAQ implementation
 * Checks that all necessary files and structures are in place
 *
 * Usage: npx tsx scripts/verify-faq-setup.ts
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const checks: { name: string; check: () => boolean; message: string }[] = [];

// File existence checks
const filesToCheck = [
  {
    path: 'app/admin-genix/dashboard/faqs/page.tsx',
    name: 'FAQ Dashboard Page',
  },
  {
    path: 'app/api/faqs/route.ts',
    name: 'FAQ API Route (GET/POST)',
  },
  {
    path: 'app/api/faqs/[id]/route.ts',
    name: 'FAQ API Route (PUT/DELETE)',
  },
  {
    path: 'app/api/faqs/[id]/answer/route.ts',
    name: 'FAQ Answer API Route (PATCH)',
  },
  {
    path: 'prisma/seed-faqs.ts',
    name: 'FAQ Seed Script',
  },
  {
    path: 'scripts/migrate-faq-ids.ts',
    name: 'FAQ Migration Script',
  },
  {
    path: 'docs/FAQ_IMPLEMENTATION.md',
    name: 'FAQ Documentation',
  },
];

console.log('🔍 Verifying FAQ Implementation...\n');

// Check file existence
for (const file of filesToCheck) {
  const fullPath = join(process.cwd(), file.path);
  const exists = existsSync(fullPath);

  checks.push({
    name: file.name,
    check: () => exists,
    message: exists ? `✅ ${file.name}` : `❌ ${file.name} - File not found: ${file.path}`,
  });
}

// Check FAQ page for required features
const faqPagePath = join(process.cwd(), 'app/admin-genix/dashboard/faqs/page.tsx');
if (existsSync(faqPagePath)) {
  const faqPageContent = readFileSync(faqPagePath, 'utf-8');

  checks.push({
    name: 'Grid Layout',
    check: () => faqPageContent.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'),
    message: faqPageContent.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3')
      ? '✅ Grid Layout Implementation'
      : '❌ Grid Layout Missing',
  });

  checks.push({
    name: 'Answer Button',
    check: () => faqPageContent.includes('onAnswer') && faqPageContent.includes('showAnswerModal'),
    message: faqPageContent.includes('onAnswer') && faqPageContent.includes('showAnswerModal')
      ? '✅ Answer Button Feature'
      : '❌ Answer Button Missing',
  });

  checks.push({
    name: 'FAQCard Component',
    check: () => faqPageContent.includes('function FAQCard'),
    message: faqPageContent.includes('function FAQCard')
      ? '✅ FAQCard Component'
      : '❌ FAQCard Component Missing',
  });

  checks.push({
    name: 'Language Support',
    check: () => faqPageContent.includes('useAdminLanguage') && faqPageContent.includes('adminLanguage'),
    message: faqPageContent.includes('useAdminLanguage') && faqPageContent.includes('adminLanguage')
      ? '✅ Multi-language Support'
      : '❌ Multi-language Support Missing',
  });

  checks.push({
    name: 'Status Badges',
    check: () => faqPageContent.includes('Answered') && faqPageContent.includes('Pending'),
    message: faqPageContent.includes('Answered') && faqPageContent.includes('Pending')
      ? '✅ Status Badges (Answered/Pending)'
      : '❌ Status Badges Missing',
  });
}

// Check API routes for translation
const apiRoutePath = join(process.cwd(), 'app/api/faqs/route.ts');
if (existsSync(apiRoutePath)) {
  const apiContent = readFileSync(apiRoutePath, 'utf-8');

  checks.push({
    name: 'API Translation',
    check: () => apiContent.includes('translateContent'),
    message: apiContent.includes('translateContent')
      ? '✅ API Auto-translation'
      : '❌ API Auto-translation Missing',
  });

  checks.push({
    name: 'faqId Generation',
    check: () => apiContent.includes('faqId') && apiContent.includes('randomUUID'),
    message: apiContent.includes('faqId') && apiContent.includes('randomUUID')
      ? '✅ faqId Generation'
      : '❌ faqId Generation Missing',
  });
}

// Check answer endpoint
const answerRoutePath = join(process.cwd(), 'app/api/faqs/[id]/answer/route.ts');
if (existsSync(answerRoutePath)) {
  const answerContent = readFileSync(answerRoutePath, 'utf-8');

  checks.push({
    name: 'Answer Endpoint',
    check: () => answerContent.includes('PATCH') && answerContent.includes('translateContent'),
    message: answerContent.includes('PATCH') && answerContent.includes('translateContent')
      ? '✅ Answer Endpoint (PATCH with translation)'
      : '❌ Answer Endpoint Incomplete',
  });
}

// Check seed script
const seedPath = join(process.cwd(), 'prisma/seed.ts');
if (existsSync(seedPath)) {
  const seedContent = readFileSync(seedPath, 'utf-8');

  checks.push({
    name: 'Seed Integration',
    check: () => seedContent.includes('seed-faqs') && seedContent.includes('seedFaqs'),
    message: seedContent.includes('seed-faqs') && seedContent.includes('seedFaqs')
      ? '✅ FAQ Seed Integration'
      : '❌ FAQ Seed Not Integrated in main seed.ts',
  });
}

// Run all checks
console.log('📋 Running Checks:\n');
let passed = 0;
let failed = 0;

for (const check of checks) {
  console.log(check.message);
  if (check.check()) {
    passed++;
  } else {
    failed++;
  }
}

console.log('\n' + '='.repeat(50));
console.log(`\n✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total: ${checks.length}\n`);

if (failed === 0) {
  console.log('🎉 All checks passed! FAQ implementation is complete.\n');
  console.log('📝 Next steps:');
  console.log('   1. Run: npm run seed (to seed FAQs)');
  console.log('   2. Run: npx tsx scripts/migrate-faq-ids.ts (if you have existing FAQs)');
  console.log('   3. Start dev server: npm run dev');
  console.log('   4. Visit: http://localhost:3000/admin-genix/dashboard/faqs\n');
  process.exit(0);
} else {
  console.log('⚠️  Some checks failed. Please review the implementation.\n');
  process.exit(1);
}
