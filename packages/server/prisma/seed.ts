import { PrismaClient, AccountType, TransactionType, BudgetPeriod } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Configuration
const NUM_USERS = parseInt(process.env.SEED_USERS || '5');
const NUM_ACCOUNTS_PER_USER = parseInt(process.env.SEED_ACCOUNTS_PER_USER || '3');
const NUM_TRANSACTIONS_PER_ACCOUNT = parseInt(process.env.SEED_TRANSACTIONS || '50');
const NUM_BUDGETS_PER_USER = parseInt(process.env.SEED_BUDGETS || '3');

// Category templates
const CATEGORY_TEMPLATES = [
  { name: 'Food & Dining', icon: '🍔', color: '#FF6B6B', type: 'expense' },
  { name: 'Transportation', icon: '🚗', color: '#4ECDC4', type: 'expense' },
  { name: 'Shopping', icon: '🛍️', color: '#45B7D1', type: 'expense' },
  { name: 'Entertainment', icon: '🎬', color: '#96CEB4', type: 'expense' },
  { name: 'Bills & Utilities', icon: '💡', color: '#FFEAA7', type: 'expense' },
  { name: 'Healthcare', icon: '🏥', color: '#DFE6E9', type: 'expense' },
  { name: 'Groceries', icon: '🛒', color: '#74B9FF', type: 'expense' },
  { name: 'Housing', icon: '🏠', color: '#A29BFE', type: 'expense' },
  { name: 'Education', icon: '📚', color: '#FD79A8', type: 'expense' },
  { name: 'Salary', icon: '💰', color: '#00B894', type: 'income' },
  { name: 'Freelance', icon: '💼', color: '#00CEC9', type: 'income' },
  { name: 'Investment', icon: '📈', color: '#FDCB6E', type: 'income' },
  { name: 'Gift', icon: '🎁', color: '#E17055', type: 'income' },
];

async function createUser(email: string) {
  const hashedPassword = await bcrypt.hash('password123', 10);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

async function createCategories(userId: string) {
  const categories = [];

  for (const template of CATEGORY_TEMPLATES) {
    const category = await prisma.category.create({
      data: {
        name: template.name,
        icon: template.icon,
        color: template.color,
        userId,
      },
    });
    categories.push({ ...category, type: template.type });
  }

  return categories;
}

async function createAccounts(userId: string) {
  const accounts = [];
  const accountTypes = Object.values(AccountType);

  for (let i = 0; i < NUM_ACCOUNTS_PER_USER; i++) {
    const accountType = accountTypes[i % accountTypes.length];
    const account = await prisma.account.create({
      data: {
        name: faker.finance.accountName(),
        type: accountType,
        currency: 'USD',
        balance: parseFloat(faker.finance.amount({ min: 100, max: 50000, dec: 2 })),
        description: faker.lorem.sentence(),
        userId,
      },
    });
    accounts.push(account);
  }

  return accounts;
}

async function createTransactions(accountId: string, categories: any[]) {
  const transactions = [];
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  for (let i = 0; i < NUM_TRANSACTIONS_PER_ACCOUNT; i++) {
    // Random date within last 6 months
    const date = faker.date.recent({ days: 180 });

    // 70% expenses, 30% income
    const isExpense = faker.datatype.boolean({ probability: 0.7 });
    const transactionType = isExpense ? TransactionType.EXPENSE : TransactionType.INCOME;
    const categoryList = isExpense ? expenseCategories : incomeCategories;
    const category = faker.helpers.arrayElement(categoryList);

    const amount = parseFloat(
      faker.finance.amount({
        min: isExpense ? 5 : 500,
        max: isExpense ? 500 : 5000,
        dec: 2,
      })
    );

    const tags = faker.helpers.arrayElements(
      ['recurring', 'one-time', 'necessary', 'optional', 'planned', 'impulse'],
      { min: 0, max: 3 }
    );

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        currency: 'USD',
        description: faker.commerce.productDescription(),
        type: transactionType,
        date,
        accountId,
        categoryId: category.id,
        tags,
      },
    });

    transactions.push(transaction);
  }

  return transactions;
}

async function createBudgets(userId: string, categories: any[]) {
  const budgets = [];
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const periods = Object.values(BudgetPeriod);

  for (let i = 0; i < NUM_BUDGETS_PER_USER; i++) {
    const category = faker.helpers.arrayElement(expenseCategories);
    const period = faker.helpers.arrayElement(periods);
    const startDate = faker.date.recent({ days: 30 });

    let endDate: Date | null = null;
    if (period === BudgetPeriod.WEEKLY) {
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);
    } else if (period === BudgetPeriod.MONTHLY) {
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (period === BudgetPeriod.YEARLY) {
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const amount = parseFloat(faker.finance.amount({ min: 100, max: 2000, dec: 2 }));
    const spent = parseFloat(faker.finance.amount({ min: 0, max: amount, dec: 2 }));

    const budget = await prisma.budget.create({
      data: {
        name: `${category.name} Budget`,
        amount,
        spent,
        period,
        categoryId: category.id,
        startDate,
        endDate,
        userId,
      },
    });

    budgets.push(budget);
  }

  return budgets;
}

async function main() {
  console.log('🌱 Seeding database...');
  console.log(`Configuration:
  - Users: ${NUM_USERS}
  - Accounts per user: ${NUM_ACCOUNTS_PER_USER}
  - Transactions per account: ${NUM_TRANSACTIONS_PER_ACCOUNT}
  - Budgets per user: ${NUM_BUDGETS_PER_USER}
  `);

  // Clean existing data (optional - comment out if you want to keep existing data)
  console.log('🧹 Cleaning existing data...');
  await prisma.transaction.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < NUM_USERS; i++) {
    const email = i === 0 ? 'test@example.com' : faker.internet.email();
    console.log(`\n👤 Creating user ${i + 1}/${NUM_USERS}: ${email}`);

    const user = await createUser(email);

    console.log('  📁 Creating categories...');
    const categories = await createCategories(user.id);
    console.log(`  ✓ Created ${categories.length} categories`);

    console.log('  💳 Creating accounts...');
    const accounts = await createAccounts(user.id);
    console.log(`  ✓ Created ${accounts.length} accounts`);

    console.log('  💰 Creating transactions...');
    let totalTransactions = 0;
    for (const account of accounts) {
      const transactions = await createTransactions(account.id, categories);
      totalTransactions += transactions.length;
    }
    console.log(`  ✓ Created ${totalTransactions} transactions`);

    console.log('  📊 Creating budgets...');
    const budgets = await createBudgets(user.id, categories);
    console.log(`  ✓ Created ${budgets.length} budgets`);
  }

  console.log('\n✅ Seeding completed!');
  console.log('\n📝 Test credentials:');
  console.log('  Email: test@example.com');
  console.log('  Password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
