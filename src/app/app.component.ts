import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plati-store';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.tokenService.getToken();

    if (token) {
      this.authService.getProfile().subscribe();
    }
  }
}
