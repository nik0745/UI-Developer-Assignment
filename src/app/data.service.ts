import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  
  constructor(private UserDetails: HttpClient) { }
  createUser(body: any) {
    return this.UserDetails.post('http://localhost:3000/RegisteredUser', body);
  }
  getUser() {
    return this.UserDetails.get('http://localhost:3000/RegisteredUser')
  }
  
  getUserById(id: number): Observable<any> {
    return this.UserDetails.get("http://localhost:3000/RegisteredUser/" + id);
  }

  updateDetail(id: string, updatedDetail: any): Observable<any> {
    return this.UserDetails.put<any>("http://localhost:3000/RegisteredUser/" + id, updatedDetail);
  }


}
