import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private userLoginSubject = new BehaviorSubject<string | null>(null);

  userRole$ = this.userRoleSubject.asObservable();
  userLogin$ = this.userLoginSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.userRoleSubject.next(localStorage.getItem('userRole'));
    this.userLoginSubject.next(localStorage.getItem('userLogin'));
  }

  setLogin(userRole: string, userLogin: string) {
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userLogin', userLogin);
    this.userRoleSubject.next(userRole);
    this.userLoginSubject.next(userLogin);
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userLogin');
    this.userRoleSubject.next(null);
    this.userLoginSubject.next(null);
  }
}
