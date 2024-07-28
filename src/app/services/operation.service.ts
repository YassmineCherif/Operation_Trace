import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../models/Operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private apiUrl = 'http://localhost:9090/operations';
  private numSerieUrl = 'http://localhost:9090/numseries/ids'; // Corrected URL
  private usersUrl = 'http://localhost:9090/operations/user'; // URL for users

  constructor(private http: HttpClient) { }

  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.apiUrl);
  }

  getOperationById(id: number): Observable<Operation> {
    return this.http.get<Operation>(`${this.apiUrl}/${id}`);
  }

  createOperation(operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(this.apiUrl, operation);
  }

  updateOperation(id: number, operation: Operation): Observable<Operation> {
    return this.http.put<Operation>(`${this.apiUrl}/${id}`, operation);
  }

  deleteOperation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getNumSeries(): Observable<string[]> {
    return this.http.get<string[]>(this.numSerieUrl);
  }

  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(this.usersUrl);
  }
}
