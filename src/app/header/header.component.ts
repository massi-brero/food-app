import { Component, OnInit } from '@angular/core'
import { DataStorageService } from '../shared/services/data-storage.service'
import { AuthService } from '../auth/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSave() {
    this.dataStorageService.save()
  }

  onFetchAll() {
    this.dataStorageService.fetchAll().subscribe()
  }
}
