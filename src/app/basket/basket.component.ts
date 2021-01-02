import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket.model';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private _basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this._basketService.basket$;
  }
  removeBasketItem(item: IBasketItem) {
    this._basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this._basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this._basketService.decrementItemQuantity(item);
  }
}
