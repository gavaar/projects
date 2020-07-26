import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./_summary/summary.module').then(m => m.SummaryModule),
      },
      {
        path: 'recent-movements',
        loadChildren: () => import('./_recently-added/recently-added.module').then(m => m.RecentlyAddedModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
