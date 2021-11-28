import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { MoyButtonModule } from '@libs/moy-button';
import { AdminToolsetModule } from './admin-toolset/admin-toolset.module';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'uploader', loadChildren: () => import('./uploader/uploader.module').then(m => m.UploaderModule), canActivate: [AdminGuard] },
  { path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule), canActivate: [AdminGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MoyButtonModule,
    AdminToolsetModule,
  ],
  declarations: [AdminComponent],
  providers: [AdminGuard]
})
export class AdminModule {}
