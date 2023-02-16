import { Component, OnInit } from '@angular/core';
import { faUser, faCartShopping, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  faUser = faUser;
  faCartShopping = faCartShopping;
  faRightToBracket = faRightToBracket;
  counterCart = 0;
  modalAuth = false;
  isAuth = false;
  profile: UserInterface | null = null

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.storeService.myCart$
      .subscribe(products => {
        this.counterCart = products.length;
      })
    this.authService.user$
      .subscribe(profile => this.profile = profile);
  }

  onModalAuth(value: boolean) {
    this.modalAuth = value;
  }

  onLoadProfile(profile: UserInterface) {
    this.profile = profile;
  }

  onLogout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
    this.profile = null
  }
}
