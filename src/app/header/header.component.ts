import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../auth/models/user';
import { AuthService } from '../auth/services/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false
  private subscription: Subscription

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user: User) => {
      this.isAuthenticated = !!user
    })
  }

  onSave() {
    this.dataStorageService.save()
  }

  onFetchAll() {
    this.dataStorageService.fetchAll().subscribe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}
