import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plati-store';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('Iniciando APP con TOKEN');
    const token = this.tokenService.getToken();
    console.log(token, '----------------');

    if (token) {
      this.authService.setIsAuth(true);
    }
  }
}
