# Database Seeding

This directory contains the seed script for populating the database with random test data.

## Usage

### Basic Seeding

Run the seed script with default configuration:

```bash
yarn prisma:seed
```

or from the server directory:

```bash
cd packages/server
yarn prisma:seed
```

### Custom Configuration

You can customize the amount of data generated using environment variables:

```bash
# Generate 10 users with custom settings
SEED_USERS=10 SEED_ACCOUNTS_PER_USER=5 SEED_TRANSACTIONS=100 SEED_BUDGETS=5 yarn prisma:seed
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SEED_USERS` | 5 | Number of users to create |
| `SEED_ACCOUNTS_PER_USER` | 3 | Number of accounts per user |
| `SEED_TRANSACTIONS` | 50 | Number of transactions per account |
| `SEED_BUDGETS` | 3 | Number of budgets per user |

## What Gets Created

The seed script generates realistic random data for:

### 1. Users
- First user is always `test@example.com` with password `password123`
- Additional users have randomly generated email addresses
- All users have the same password: `password123`

### 2. Categories
Each user gets 13 predefined categories:
- **Expense categories**: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Groceries, Housing, Education
- **Income categories**: Salary, Freelance, Investment, Gift

### 3. Accounts
Each user gets multiple accounts with:
- Random account names
- Different account types (BANK, CASH, CREDIT_CARD, INVESTMENT, OTHER)
- Random balances between $100 and $50,000
- Descriptions

### 4. Transactions
Each account gets multiple transactions with:
- Random dates within the last 6 months
- 70% expenses, 30% income (realistic distribution)
- Expense amounts: $5 - $500
- Income amounts: $500 - $5,000
- Random tags (recurring, one-time, necessary, etc.)
- Associated categories

### 5. Budgets
Each user gets budget plans with:
- Different periods (WEEKLY, MONTHLY, YEARLY)
- Random budget amounts
- Random spent amounts (never exceeding the budget limit)
- Start and end dates based on the period

## Examples

### Minimal Test Data
```bash
SEED_USERS=1 SEED_ACCOUNTS_PER_USER=1 SEED_TRANSACTIONS=10 SEED_BUDGETS=1 yarn prisma:seed
```

### Large Dataset for Performance Testing
```bash
SEED_USERS=100 SEED_ACCOUNTS_PER_USER=5 SEED_TRANSACTIONS=500 SEED_BUDGETS=10 yarn prisma:seed
```

### Development Setup
```bash
SEED_USERS=3 SEED_ACCOUNTS_PER_USER=2 SEED_TRANSACTIONS=30 SEED_BUDGETS=2 yarn prisma:seed
```

## Test Credentials

After seeding, you can log in with:
- **Email**: test@example.com
- **Password**: password123

## Notes

- The seed script **deletes all existing data** before creating new records
- To preserve existing data, comment out the deletion section in `seed.ts` (lines 182-187)
- All monetary values are in USD
- Faker.js is used to generate realistic random data
