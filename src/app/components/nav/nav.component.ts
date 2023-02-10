import { Component, OnInit } from '@angular/core';
import { faUser, faCartShopping, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

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
  profile: UserInterface = {
    id: '',
    email: '',
    password: '',
    name: '',
    role: '',
    avatar: '',
    creationAt: '',
    updatedAt: ''
  }

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.storeService.myCart$
      .subscribe(products => {
        this.counterCart = products.length;
      })

    this.authService.isAuth$
      .subscribe(value => this.isAuth = value);

    if (this.isAuth) {
      this.authService.getProfile()
        .subscribe(profile => this.profile = profile);
    }
  }

  onModalAuth(value: boolean) {
    this.modalAuth = value;
  }

  onLoadProfile(profile: UserInterface) {
    this.profile = profile;
    this.authService.isAuth$
      .subscribe(value => this.isAuth = value);
  }

  onLogout() {
    this.tokenService.removeToken();
    this.authService.setIsAuth(false);
    this.authService.isAuth$
      .subscribe(value => this.isAuth = value);
  }
}
