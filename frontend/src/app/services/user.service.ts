import { USER_LOGIN_URL } from './../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrServices:ToastrService ) {
    this.userObservable = this.userSubject.asObservable()
   }

   login(userLogin:IUserLogin):Observable<User>{
     return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
       tap ({
         next:(user) => {
          this.userSubject.next(user);
          this.toastrServices.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          )
         },
         error: (errorResponse) => {
          this.toastrServices.error(errorResponse,'Login Failed');
         }
       })
     );
   }



}
