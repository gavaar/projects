import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'privacy', loadChildren: () => import('./_static/privacy.module').then(m => m.PrivacyStaticModule) },
  { path: 'changelog', loadChildren: () => import('./_static/changelog.module').then(m => m.ChangelogStaticModule) },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
