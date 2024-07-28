
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trace } from '../models/trace';

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private apiUrl = 'http://localhost:9090/traces';

  constructor(private http: HttpClient) {}

  getTraces(): Observable<Trace[]> {
    return this.http.get<Trace[]>(this.apiUrl);
  }

  /** 

  getTraceById(id: number): Observable<Trace> {
    return this.http.get<Trace>(`${this.apiUrl}/${id}`);
  }

  createTrace(trace: Trace): Observable<Trace> {
    return this.http.post<Trace>(this.apiUrl, trace);
  }

  updateTrace(id: number, trace: Trace): Observable<Trace> {
    return this.http.put<Trace>(`${this.apiUrl}/${id}`, trace);
  }

  */

  deleteTrace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
