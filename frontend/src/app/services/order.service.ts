import { ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from './../shared/constants/urls';
import { Observable } from 'rxjs';
import { ORDERS_CREATE_URL } from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/shared/models/Order';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private http:HttpClient) { }


  create(order:Order){
    return this.http.post<Order>(ORDERS_CREATE_URL,order);

  }
  getNewOrderForCurrentUser():Observable<Order>{
  return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
}
pay(order:Order):Observable<string>{
  return this.http.post<string>(ORDER_PAY_URL,order);
}
trackOrderById(id:number): Observable<Order>{
  return this.http.get<Order>(ORDER_TRACK_URL + id);
}
}


