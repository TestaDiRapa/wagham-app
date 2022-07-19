import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  isLoading = false;
  logoPath = `${environment.waghamApi}/content/images/logo.png`;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log(location.search);
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('code')) {
      this.authService.login(urlParams.get('code'))
        .subscribe();
    }
  }

  ionViewWillEnter() {
    this.authService.userIsAuthenticated
      .pipe(
        take(1),
        switchMap( isAuthenticated => {
          if (!isAuthenticated) {
            return null;
          }
          return this.authService.token;
        }),
        switchMap( token => {
          if (!token) {
            return null;
          }
          return token.role;
        })
      )
      .subscribe();
  }

  discordAuth() {
    const urlParams = new URLSearchParams(location.href);
    if (!urlParams.has('code')) {
      Browser.open({ url: environment.discordAuthUrl, windowName: '_self' });
    } else {
      //login
    }
  }

}
