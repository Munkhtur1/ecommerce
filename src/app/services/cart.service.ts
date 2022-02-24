import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // Sagsand ali hediin orson eseh If
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length > 0) {
      // itemiin id-gaar sagsand baigaa itemiig olno

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;

      // herev olvol shalgana
      alreadyExistInCart = (existingCartItem != undefined);
    }

    if(alreadyExistInCart){
      // quantity - iig nemne
      existingCartItem.quantity!++;
    }
    else{
      // array-d itemiig nemne
      this.cartItems.push(theCartItem);
    }

    // Sagsan dah totalprice bolon total quantity tootsno
    this.computeCartTotals();
  }

    computeCartTotals(){
      
      
      let totalPriceValue: number = 0;
      let totalQuantityValue: number = 0;

      for (let currentCartItem of this.cartItems) {
        totalPriceValue += currentCartItem.quantity! * currentCartItem.unitPrice!;
        totalQuantityValue += currentCartItem.quantity!;
      }

      // shine utguudaa ilgeene
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      // 
      this.logCartData(totalPriceValue, totalQuantityValue);
    }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Sagsan dahi Zuils');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity! * tempCartItem.unitPrice!;
      console.log(`name: ${tempCartItem.name}, too: ${tempCartItem.quantity}, Une: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }

    console.log(`Niit Une: ${totalPriceValue.toFixed(2)}, Niit Too: ${totalQuantityValue}`);
    console.log('----');  
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity!--;

    if(theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {

      // get index of item in the array
      const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

      // if found, remove the item the array at the given index
      if(itemIndex > -1) {
        this.cartItems.splice(itemIndex, 1);

        this.computeCartTotals();
      }
  }
}
