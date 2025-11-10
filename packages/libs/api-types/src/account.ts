export enum AccountType {
  BANK = 'BANK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  INVESTMENT = 'INVESTMENT',
  OTHER = 'OTHER',
}

export interface CreateAccountDto {
  name: string;
  type: AccountType;
  currency: string;
  initialBalance?: number;
  description?: string;
}

export interface UpdateAccountDto {
  name?: string;
  type?: AccountType;
  description?: string;
}

export interface AccountDto {
  id: string;
  name: string;
  type: AccountType;
  currency: string;
  balance: number;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
