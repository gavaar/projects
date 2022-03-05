import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TattooService } from './tattoo.service';

@Component({
  templateUrl: './tattoo.component.html',
  styleUrls: ['./tattoo.component.scss', '../_styles/_art-display.common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TattooComponent {
  images: Observable<string[]>;

  imgFn = (_i, url) => url;

  constructor(private tatooService: TattooService) {}

  ngOnInit(): void {
    this.images = this.tatooService.loadMore();
  }
}
