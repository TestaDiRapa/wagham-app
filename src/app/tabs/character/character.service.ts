/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { IllegalStateError } from 'src/app/shared/illegal-state-error';
import { environment } from 'src/environments/environment';
import { Character, CharacterData } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private _character = new BehaviorSubject<Character>(null);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

get character(): Observable<Character> {
  return this._character.asObservable()
    .pipe(
      switchMap( character => {
        if (!!character) {
          return of(character);
        } else {
          return this.fetchCharacter();
        }
      })
    );
}

fetchCharacter() {
  return this.authService.token
    .pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token.accessToken}`)
          .set('Content-Type', 'application/json');
        return this.http.get<CharacterData>(`${environment.waghamApi}/character`, {headers});
      }),
      catchError( (error: HttpErrorResponse) => {
        throw new IllegalStateError(error.error.message, `${error.status}_${error.statusText}`);
      }),
      map( responseData => {
        const newCharacter = new Character(responseData);
        this._character.next(newCharacter);
        return newCharacter;
      })
    );
}

}