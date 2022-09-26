import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false)

  constructor() { }

  showLoading(){
    this.isLoadingSubject.next(true);
  }
  hideLoading(){
    this.isLoadingSubject.next(false);
  }
  get isLoading(){
    return this.isLoadingSubject.asObservable();
  }
}
