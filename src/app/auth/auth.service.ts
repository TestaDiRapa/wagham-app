/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { RefreshTokenData, Token, TokenData } from './token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = new BehaviorSubject<Token>(null);

  constructor(private http: HttpClient) {}

  get token(): Observable<Token> {
    return this._token.asObservable().pipe(
      switchMap((token, _) => {
        if (!token) {
          return of(token);
        } else if (!token.isValid()) {
          const headers = new HttpHeaders();
          headers.set('Authorization', `Bearer ${token.refreshToken}`);
          headers.set('Content-Type', 'application/json');
          return this.http
            .post<RefreshTokenData>(
              `${environment.waghamApi}/refresh`,
              { discordToken: token.discordToken },
              { headers }
            )
            .pipe(
              take(1),
              map((refreshTokenData) => {
                const newToken = token.copy({
                  accessToken: refreshTokenData.access_token,
                  expiresIn: refreshTokenData.expires_in,
                  role: refreshTokenData.role,
                });
                this._token.next(newToken);
                return newToken;
              })
            );
        } else {
          return of(token);
        }
      })
    );
  }

  get userIsAuthenticated(): Observable<boolean> {
    return this.token.pipe(map((token) => !!token && token.isValid()));
  }

  login(code: string): Observable<Token> {
    return this.http
      .get<TokenData>(`${environment.waghamApi}/auth?code=${code}`)
      .pipe(
        take(1),
        map((responseData) => {
          const newToken = new Token(responseData);
          this._token.next(newToken);
          return newToken;
        })
      );
  }
}
