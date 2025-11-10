import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
    },
  });

  console.log('Created test user:', user.email);

  // Create some default categories
  const categories = [
    { name: 'Food & Dining', icon: '🍔', color: '#FF6B6B' },
    { name: 'Transportation', icon: '🚗', color: '#4ECDC4' },
    { name: 'Shopping', icon: '🛍️', color: '#45B7D1' },
    { name: 'Entertainment', icon: '🎬', color: '#96CEB4' },
    { name: 'Bills & Utilities', icon: '💡', color: '#FFEAA7' },
    { name: 'Healthcare', icon: '🏥', color: '#DFE6E9' },
    { name: 'Salary', icon: '💰', color: '#00B894' },
    { name: 'Freelance', icon: '💼', color: '#00CEC9' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: {
        userId_name: {
          userId: user.id,
          name: cat.name,
        },
      },
      update: {},
      create: {
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
        userId: user.id,
      },
    });
  }

  console.log('Created default categories');

  // Create a sample account
  await prisma.account.upsert({
    where: { id: 'sample-account' },
    update: {},
    create: {
      id: 'sample-account',
      name: 'Main Checking',
      type: 'BANK',
      currency: 'USD',
      balance: 1000.00,
      userId: user.id,
    },
  });

  console.log('Created sample account');
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
