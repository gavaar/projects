import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: '../../assets/_static/data-deletion.html',
})
export class DataDeletionComponent { }

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DataDeletionComponent }]),
  ],
  declarations: [DataDeletionComponent],
})
export class DataDeletionModule { }
