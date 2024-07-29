import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = 'http://localhost:9090/users/login'; 

  constructor(private http: HttpClient) {}

  login(loginEmail: string, password: string): Observable<{ message: string, role: string }> {
    const params = new HttpParams()
      .set('loginEmail', loginEmail)
      .set('password', password);
      
    return this.http.post<{ message: string, role: string }>(this.loginUrl, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'json'
    }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return of({ message: 'Login failed', role: '' }); // Handle error as needed
      })
    );
  }
}
