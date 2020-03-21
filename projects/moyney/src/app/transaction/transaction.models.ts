import { parseDateReadable } from '@common/transform';

export interface CollectionIncome {
  amount: number;
  currency: string;
  date_added: { seconds: number; nanoseconds: number };
  description: string;
  tags: { [tag: string]: true };
  id?: string;
}

export class Income {
  id: string;
  description: string;
  amount: number;
  tags: string;
  date?: string;
  originalDate?: Date;

  constructor(i: CollectionIncome) {
    const date = new Date(i.date_added.seconds * 1000);

    return {
      id: i.id,
      description: i.description,
      amount: i.amount,
      tags: Object.keys(i.tags).join(', '),
      date: parseDateReadable(date),
      originalDate: date,
    };
  }
}
