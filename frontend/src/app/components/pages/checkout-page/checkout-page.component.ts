import { Router } from '@angular/router';
import { OrderService } from './../../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../services/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/models/Order';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order=new Order;
  checkoutForm!:FormGroup;
    constructor(CartService:CartService,
      private formBuilder:FormBuilder,
      private userService:UserService,
      private toastrService: ToastrService,
      private orderService: OrderService,
      private router:Router) { 
        const cart = CartService.getCart();
        this.order.items=cart.items;
        this.order.totalPrice=cart.totalPrice;

      }

  ngOnInit(): void {
    let {name,address}= this.userService.currentUser;
    this.checkoutForm= this.formBuilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
    });

}
get fc(){
  return this.checkoutForm.controls;
}
createOrder(){
  if(this.checkoutForm.invalid){
    this.toastrService.warning('Please fill the inputs','Invalid inputs');
    return;
  }
  if(!this.order.addressLatLng){
    this.toastrService.warning('Please select your location on the map', 'Location');
    return;
  }

  this.order.name=this.fc.name.value;
  this.order.address=this.fc.address.value;
  
  this.orderService.create(this.order).subscribe({
    next:() => {
      this.router.navigateByUrl('/payment');
    },
    error:(errorResponse) => {
      this.toastrService.error(errorResponse.error, 'Cart');
    }
  })

}
}
