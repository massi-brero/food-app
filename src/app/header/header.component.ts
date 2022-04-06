import { Component, OnInit } from '@angular/core'
import { DataStorageService } from '../shared/services/data-storage.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataStrorageService: DataStorageService) {}

  ngOnInit(): void {}

  onSave() {
    this.dataStrorageService.save()
  }

  onFetchAll() {
    this.dataStrorageService.fetchAll()
  }
}
