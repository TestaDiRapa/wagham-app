import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';
import { UserType } from 'src/app/auth/token.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  readonly userType = UserType;
  userRole = null;
  logoPath = `${environment.waghamApi}/content/images/logo.png`;

  constructor(
    private authService: AuthService,
    private loadingCtrl: WaghamLoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingCtrl
      .create()
      .then((loadingElement) => {
        loadingElement.present();
        const urlParams = new URLSearchParams(location.search);
        this.router.navigate([], {
          queryParams: {
            code: null,
          },
          queryParamsHandling: 'merge',
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
          (role) => {
            if (role !== UserType.newPlayer && role !== UserType.outsider) {
              this.router.navigateByUrl('/tabs/character');
            }
            this.userRole = role;
            loadingElement.dismiss();
          },
          () => {
            loadingElement.dismiss();
          }
        );
      });
  }

  ionViewWillEnter() {}

  discordAuth() {
    Browser.open({ url: environment.discordAuthUrl, windowName: '_self' });
  }

  joinWagham() {
    Browser.open({ url: environment.waghamInviteUrl, windowName: '_self' });
  }
}
