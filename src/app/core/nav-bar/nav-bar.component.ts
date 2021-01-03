import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket.model';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;

  constructor(
    private _basketService: BasketService,
    private _accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.basket$ = this._basketService.basket$;
    this.currentUser$ = this._accountService.currentUser$;
  }

  logout() {
    this._accountService.logout();
  }
}
