import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialogModule, MatIconRegistry } from '@angular/material';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MoyFooterModule } from '@libs/moy-footer/moy-footer.module';
import { MoyHeaderModule } from '@libs/moy-header/moy-header.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatDialogModule,
    MoyHeaderModule,
    MoyFooterModule,
    LoginModule,
  ],
  entryComponents: [LoginComponent],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('google', domSanitizer.bypassSecurityTrustResourceUrl('assets/svg-icons/google.svg'));
    matIconRegistry.addSvgIcon(
      'facebook',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/svg-icons/facebook.svg'),
    );
  }
}
