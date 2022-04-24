import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/services/auth.service';
import {LoggingService} from './logging.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'food-app'

  constructor(private authService: AuthService, private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.authService.autoLogin()
    this.loggingService.printLog('### AppComponent ngOnInit ###')
  }
}
