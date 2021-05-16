import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoyHeaderModule } from '@libs/moy-header';
import { MoyFooterModule } from '@libs/moy-footer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MoyHeaderModule,
    MoyFooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
