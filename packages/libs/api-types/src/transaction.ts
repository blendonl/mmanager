export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}

export interface CreateTransactionDto {
  amount: number;
  currency: string;
  description?: string;
  type: TransactionType;
  date: Date;
  accountId: string;
  categoryId?: string;
  tags?: string[];
}

export interface UpdateTransactionDto {
  amount?: number;
  description?: string;
  type?: TransactionType;
  date?: Date;
  accountId?: string;
  categoryId?: string;
  tags?: string[];
}

export interface TransactionDto {
  id: string;
  amount: number;
  currency: string;
  description?: string;
  type: TransactionType;
  date: Date;
  accountId: string;
  categoryId?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionFilterDto {
  accountId?: string;
  categoryId?: string;
  type?: TransactionType;
  fromDate?: Date;
  toDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
}
