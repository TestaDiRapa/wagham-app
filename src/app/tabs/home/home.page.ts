import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  logoPath = `${environment.waghamApi}/content/images/logo.png`;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const urlParams = new URLSearchParams(location.search);
    this.router.navigate([], {
      queryParams: {
        code: null
      },
      queryParamsHandling: 'merge'
    });
    let tokenSubscription;
    if (urlParams.has('code')) {
      tokenSubscription = this.authService.login(urlParams.get('code'));
    } else {
      tokenSubscription = this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          if (!token) {
            throw new Error('NO_TOKEN');
          }
          return token.role;
        })
      );
    }
    tokenSubscription.subscribe(
      (result) => {
        this.router.navigateByUrl('/tabs/character');
      },
      (error) => {
        console.log('NO_TOKEN');
      }
    );
  }

  ionViewWillEnter() {
  }

  discordAuth() {
    Browser.open({ url: environment.discordAuthUrl, windowName: '_self' });
  }

}
