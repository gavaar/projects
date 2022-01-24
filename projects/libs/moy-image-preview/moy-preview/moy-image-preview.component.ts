import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'preview',
  templateUrl: './moy-image-preview.component.html',
  styleUrls: ['./moy-image-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyImagePreviewComponent implements OnInit {
  image: SafeUrl;
  loaded = false;

  constructor(private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<MoyImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string) {}

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustUrl(this.data);
  }
}
