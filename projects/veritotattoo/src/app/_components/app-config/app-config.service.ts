import { Injectable } from '@angular/core';
import { AppConfig, RawConfig } from '.';
import { fireStorage, firestore } from '@firebase';
import { doc, DocumentData, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { concatMap, filter, map, take } from 'rxjs/operators';
import { AppConfigSections } from './app-config.models';
import { getDownloadURL, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private _config = new BehaviorSubject<AppConfig>(null);

  private get configRef(): DocumentReference<DocumentData> {
    return doc(firestore, 'settings', 'config');
  }

  get(): Observable<AppConfig> {
    if (this._config.value == null) {
      this.getConfig();
    }

    return this._config.asObservable().pipe(filter(v => v != null));
  }

  save(config: RawConfig): Observable<void> {
    return from(setDoc(this.configRef, config, { merge: true }));
  }

  private getConfig(): void {
    from(getDoc(this.configRef)).pipe(
      concatMap(dataRef => {
        const data = dataRef.data();
        const { profile, background } = data[AppConfigSections.Header];
        const { design, tattoo } = data[AppConfigSections.Sections];

        const allRefs = [profile, background, design, tattoo].map(section => getDownloadURL(ref(fireStorage, section)));

        return from(Promise.all(allRefs)).pipe(map(([profileUrl, backgrounUrl, designUrl, tattooUrl]) => {
          return {
            ...data,
            [AppConfigSections.Header]: {
              ...data[AppConfigSections.Header],
              profile: { value: profile, src: profileUrl },
              background: { value: background, src: backgrounUrl },
            },
            [AppConfigSections.Sections]: {
              design: { value: design, src: designUrl },
              tattoo: { value: tattoo, src: tattooUrl },
            }
          } as AppConfig
        }));
      }),
      take(1),
    ).subscribe(appConfig => this._config.next(appConfig));
  }
}
