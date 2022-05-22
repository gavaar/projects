import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ImageStorageService } from '@vero-components/image-storage';
import { Observable } from 'rxjs';
import { DesignService } from './design.service';

@Component({
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss', '../_styles/_art-display.common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent implements OnInit {
  images: Observable<string[]>;

  imgFn = (_i, url) => url;

  constructor(private designService: DesignService) {}

  ngOnInit(): void {
    this.images = this.designService.listChanges();
    this.designService.loadMore();
  }
}
