import { Component, Output, EventEmitter } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faClose = faClose;

  email = 'admin@mail.com';
  password = 'admin123';
  token = '';
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

  @Output() modalAuth = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  onModalAuth() {
    this.modalAuth.emit(false);
  }

  onLogin() {
    this.authService.login(this.email, this.password)
      .pipe(
        switchMap((response) => {
          this.token = response.access_token;
          return this.authService.getProfile(this.token);
        })
      )
      .subscribe((user) => {
        this.profile = user;
        console.log(this.profile);
      });
  }

  stopPropagation(event: Event) {
    event.stopPropagation()
  }
}


