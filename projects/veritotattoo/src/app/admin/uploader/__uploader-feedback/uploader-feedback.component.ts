import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UploadState } from '@vero-components/image-storage';

@Component({
  selector: 'uploader-feedback',
  templateUrl: './uploader-feedback.component.html',
  styleUrls: ['./uploader-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderFeedbackComponent {
  @Input() uploadState: UploadState;

  minimized = false;

  uploadingFileFn = (index: number) => (index);
}
