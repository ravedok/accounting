export type movementTypes = 'income' | 'expense';

export class Movement {
  uid?: string;
  date: Date;
  description: string;
  amount: number;
  type: movementTypes;

  constructor() {
    this.date = new Date();
    this.type = 'income';
    this.amount = 0;
    this.description = '';
  }
}
