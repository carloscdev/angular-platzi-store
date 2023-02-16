import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: UserInterface | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$
      .subscribe(profile => {
        this.user = profile;
      })
  }
}
