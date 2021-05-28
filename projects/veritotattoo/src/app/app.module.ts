import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoyFooterModule } from '@libs/moy-footer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaletteModule } from './_components/palette';
import { DynamicHeaderModule } from './_components/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MoyFooterModule,
    DynamicHeaderModule,
    PaletteModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
