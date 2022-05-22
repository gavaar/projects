import { Component, Input } from '@angular/core';
import { MoyFile } from './moy-file';

@Component({
  selector: 'moy-file',
  templateUrl: './moy-file.component.html',
  styleUrls: ['./moy-file.component.scss'],
})
export class MoyFileComponent {
  @Input() config: MoyFile;

  onSelectFiles(files: File[]) {
    this.config.control.setValue([...files]);
  }
}
