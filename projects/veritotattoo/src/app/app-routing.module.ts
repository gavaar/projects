import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'changelog', loadChildren: () => import('./_static/changelog.module').then(m => m.VeroChangelogModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.VeroAboutModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.VeroContactModule) },
  { path: 'reserve', loadChildren: () => import('./reserve/reserve.module').then(m => m.VeroReserveModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
