import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoyFooterModule } from '@libs/moy-footer/moy-footer.module';
import { MoyButtonModule } from '@libs/moy-button/moy-button.module';
import { MoyHeaderModule } from '@libs/moy-header/moy-header.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MoyFooterModule,
    MoyButtonModule,
    MoyHeaderModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
