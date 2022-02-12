import { Injectable } from '@angular/core';
import { AppConfig, RawConfig } from '.';
import { fireStorage, firestore } from '@firebase';
import { doc, DocumentData, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AppConfigSections } from './app-config.models';
import { getDownloadURL, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private get configRef(): DocumentReference<DocumentData> {
    return doc(firestore, 'settings', 'config');
  }

  get(): Observable<AppConfig> {
    return from(getDoc(this.configRef)).pipe(
      map(d => d.data()),
      concatMap((data: RawConfig) => {
        const { profile } = data[AppConfigSections.Header];
        const { design, tattoo } = data[AppConfigSections.Sections];
        const profileRef = ref(fireStorage, profile),
          designRef = ref(fireStorage, design),
          tattooRef = ref(fireStorage, tattoo);

        return from(Promise.all([getDownloadURL(profileRef), getDownloadURL(designRef), getDownloadURL(tattooRef)]))
          .pipe(map(([profileUrl, designUrl, tattooUrl]) => {
            return {
              ...data,
              [AppConfigSections.Header]: {
                profile: { value: profile, src: profileUrl},
              },
              [AppConfigSections.Sections]: {
                design: { value: design, src: designUrl },
                tattoo: { value: tattoo, src: tattooUrl },
              }
            } as AppConfig
          }));
      }),
    );
  }

  save(config: RawConfig): Observable<void> {
    return from(setDoc(this.configRef, config, { merge: true }));
  }
}
