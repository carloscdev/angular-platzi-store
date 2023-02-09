import { Component, OnInit } from '@angular/core';
import { faUser, faCartShopping, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { StoreService } from 'src/app/services/store.service';

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

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.myCart$
      .subscribe(products => {
        this.counterCart = products.length;
      })
  }

  onModalAuth(value: boolean) {
    this.modalAuth = value;
  }
}
