import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AdminService } from './admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.adminService.userChanges.pipe(
      filter(user => user != null),
      map(user => user?.admin),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigateByUrl('admin');
        }
      }),
    );
  }
}
