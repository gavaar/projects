import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'changelog', loadChildren: () => import('./_static/changelog.module').then(m => m.VeroChangelogModule) },
  { path: 'illustrations', loadChildren: () => import('./illustrations/illustrations.module').then(m => m.IllustrationsModule) },
  { path: 'tattoo', loadChildren: () => import('./tattoo/tattoo.module').then(m => m.TattooModule) },
  { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
