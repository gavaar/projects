import { parseDateReadable } from '../_common/transform';

export interface CollectionIncome {
  amount: number;
  currency: string;
  date_added: { seconds: number; nanoseconds: number };
  description: string;
  tags: { [tag: string]: true };
}

export class Income {
  description: string;
  amount: number;
  tags: string;
  date?: string;

  constructor(i: CollectionIncome) {
    const date = new Date(i.date_added.seconds * 1000);

    return {
      description: i.description,
      amount: i.amount,
      tags: Object.keys(i).join(', '),
      date: parseDateReadable(date),
    };
  }
}
