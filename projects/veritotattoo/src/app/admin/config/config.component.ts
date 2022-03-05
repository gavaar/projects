import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppConfig, AppConfigSections, AppConfigService } from '@vero-components/app-config';
import { ImageStorageService, ImgType } from '@vero-components/image-storage';
import { AsyncSubject, combineLatest, Observable } from 'rxjs';
import { ConfigUpdatesCache } from './__changes-cache/changes-cache';
import { ImageData } from '@vero-components/image-storage';
import { map, tap } from 'rxjs/operators';

@Component({
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers: [ImageStorageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  loaded = this.cacheFromSavedConfig();
  settingsCache: ConfigUpdatesCache;
  selectedSection: AppConfigSections;

  constructor(
    public location: Location,
    private configService: AppConfigService,
    private imageStorageService: ImageStorageService
  ) {}

  onUpdateFormValues(tab: AppConfigSections, id: string, value: string): void {
    this.settingsCache.selectedValues = {
      ...this.settingsCache.selectedValues,
      [tab]: {
        ...this.settingsCache.selectedValues[tab],
        [id]: value,
      }
    };
  }

  onSelectPreview(tab: AppConfigSections): void {
    this.selectedSection = tab === this.selectedSection ? null : tab;
  }

  onSaveConfig(): void {
    this.configService.save(this.settingsCache.rawValues).subscribe(() => {
      this.settingsCache.commitChanges();
    });
  }

  private cacheFromSavedConfig(): Observable<boolean> {
    const loaded = new AsyncSubject<boolean>();

    this.configService.get().subscribe((config: AppConfig) => {
      this.settingsCache = new ConfigUpdatesCache(config);
      loaded.next(true);
      loaded.complete();
    });

    return loaded.asObservable().pipe(tap(() => this.populateImageInputs()));
  }

  private populateImageInputs(page = 0) {
    const image$ = ['base', 'design', 'tattoo'].map(folder => {
      return this.imageStorageService.list(folder as ImgType, page).pipe(map(list => ({ folder, list })));
    });

    combineLatest(image$).subscribe(([base, design, tattoo]: [{ folder: ImgType; list: ImageData[] }, { folder: ImgType; list: ImageData[] }, { folder: ImgType; list: ImageData[] }]) => {
      const buildList = ({ folder, list }) => list.map(img => ({ src: img.imageUrl as string, value: `${folder}/${img.id}` }));
      const images = buildList(base).concat(buildList(design)).concat(buildList(tattoo));
      this.settingsCache.addImageOptions(images);
    });
  }
}
