import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
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
    private _service: ProfileService,
    private _dialogRef: MatDialogRef<ProfileComponent>,
    private _snack: MatSnackBar,
  ) {}

  onLogout() {
    if (this.confirmLogout) {
      this._service.logout().subscribe();
      this._dialogRef.afterClosed().subscribe(() => {
        this.store.state = { user: null };
        this._snack.open('Logged out');
      });
      this._dialogRef.close();
    } else {
      this.confirmLogout = true;
    }
  }
}
