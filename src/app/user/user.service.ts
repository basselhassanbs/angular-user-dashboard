import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(
    page: number,
    per_page: number
  ): Observable<{ data: User[]; total: number; total_pages: number }> {
    return this.http.get<{ data: User[]; total: number; total_pages: number }>(
      this.apiUrl,
      {
        params: {
          page,
          per_page,
        },
      }
    );
  }

  getUser(id: string): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(this.apiUrl + '/' + id);
  }
}
