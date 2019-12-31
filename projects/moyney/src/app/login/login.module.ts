import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyButtonModule } from '@libs/moy-button/moy-button.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, MoyButtonModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
