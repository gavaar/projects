import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProfileService } from './profile.service';
import { ProfileStore } from './profile.store';

@Component({
  selector: 'moy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore, ProfileService],
})
export class ProfileComponent {
  confirmLogout = false;

  constructor(
    public store: ProfileStore,
    private service: ProfileService,
    private dialogRef: MatDialogRef<ProfileComponent>,
  ) {}

  onLogout() {
    if (this.confirmLogout) {
      this.service.logout().subscribe();
      this.store.state = { user: null };
      this.dialogRef.close();
    } else {
      this.confirmLogout = true;
    }
  }
}
