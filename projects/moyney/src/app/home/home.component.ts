import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';
import { Income } from '../transaction/transaction.models';
import { TransactionService } from '../transaction/transaction.service';
import { HomeStore } from './home.store';

enum MovementSummaryTitles {
  Summary = 'Summary',
  RecentMovements = 'Recent Movements',
}

enum CardIcons {
  Summary = 'timeline',
  RecentMovements = 'view_list',
}

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [TransactionService],
  providers: [HomeStore],
})
export class HomeComponent {
  recentlyAddedToSummary = () => {
    const icon = this.currentCardIcon;
    const _newIcon = icon === CardIcons.RecentMovements ? CardIcons.Summary : CardIcons.RecentMovements;
    const _newTitle =
      icon === CardIcons.RecentMovements ? MovementSummaryTitles.Summary : MovementSummaryTitles.RecentMovements;
    const _newRoute = icon === CardIcons.RecentMovements ? '' : 'recent-movements';

    this.cards.recently_added_and_summary.suffixButtons[0].setIcon(_newIcon);
    this.cards.recently_added_and_summary.title = _newTitle;
    this.router.navigate([_newRoute], { skipLocationChange: true });
  };

  cards: { [card: string]: AbstractMoyCard } = {
    add: new MoyCard({ title: 'Add Income' }),
    recently_added_and_summary: new MoyCard({
      title: MovementSummaryTitles.Summary,
      suffixButtons: [
        new MoyButtonRound({
          icon: 'timeline',
          click: this.recentlyAddedToSummary,
        }),
      ],
    }),
  };

  get currentCardIcon(): string {
    return this.cards.recently_added_and_summary.suffixButtons[0].icon;
  }

  constructor(private router: Router, private store: HomeStore, private _snack: MatSnackBar) {}

  pushToRecentlyAdded(income: Income): void {
    this.store.state.recentlyAddedTable.addRows([income]);
    this._snack.open(`Successfully added ${income.description}`);
    if (this.currentCardIcon === CardIcons.Summary) this.recentlyAddedToSummary();
  }
}
