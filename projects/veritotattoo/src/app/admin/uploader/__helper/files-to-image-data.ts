import { DomSanitizer } from '@angular/platform-browser';
import { ImageData } from '@vero-components/image-storage';

export function filesToImageData(files: File[], sanitizer: DomSanitizer): ImageData[] {
  return files.map(f => ({
    file: f,
    available: false,
    folder: 'base',
    description: f.name,
    imageUrl: sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f)),
  }));
}
