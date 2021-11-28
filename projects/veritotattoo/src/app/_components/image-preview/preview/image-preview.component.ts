import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  image: SafeUrl;

  constructor(private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string) {}

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustUrl(this.data);
  }
}
