export enum BudgetPeriod {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface CreateBudgetDto {
  name: string;
  amount: number;
  period: BudgetPeriod;
  categoryId?: string;
  startDate: Date;
  endDate?: Date;
}

export interface UpdateBudgetDto {
  name?: string;
  amount?: number;
  period?: BudgetPeriod;
  categoryId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface BudgetDto {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: BudgetPeriod;
  categoryId?: string;
  startDate: Date;
  endDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
