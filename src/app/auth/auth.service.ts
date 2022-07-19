/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Token, TokenData } from './token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token = new BehaviorSubject<Token>(null);

  constructor(
    private http: HttpClient
  ) { }

  get token(): Observable<Token> {
    return this._token.asObservable();
  }

  get userIsAuthenticated(): Observable<boolean> {
    return this.token.pipe(
      map( token => !!token && token.isValid())
    );
  }

  login(code: string): Observable<Token> {
    return this.http.get<TokenData>(`${environment.waghamApi}/user?code=${code}`)
      .pipe(
        take(1),
        map( (responseData) => {
          const newToken = new Token(responseData);
          this._token.next(newToken);
          return newToken;
        })
      );
  }

}

