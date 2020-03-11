import { parseDateReadable } from '../_common/transform';

export interface CollectionIncome {
  id: string;
  amount: number;
  currency: string;
  date_added: { seconds: number; nanoseconds: number };
  description: string;
  tags: { [tag: string]: true };
}

export class Income {
  id: string;
  description: string;
  amount: number;
  tags: string;
  date?: string;

  constructor(i: CollectionIncome) {
    const date = new Date(i.date_added.seconds * 1000);

    return {
      id: i.id,
      description: i.description,
      amount: i.amount,
      tags: Object.keys(i).join(', '),
      date: parseDateReadable(date),
    };
  }
}
