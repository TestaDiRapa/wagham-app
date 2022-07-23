import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { IllegalStateError } from 'src/app/shared/illegal-state-error';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit, OnDestroy {
  loadedCharacter: Character;
  private characterSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private characterService: CharacterService,
    private loadingCtrl: WaghamLoadingController,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (!!this.characterSubscription) {this.characterSubscription.unsubscribe();}
  }

  ngOnInit(): void {
    this.characterSubscription = this.characterService.character.subscribe(
      character => {
        this.loadedCharacter = character;
      }
    );
  }

  ionViewWillEnter() {
    this.loadingCtrl.create().then( loadingEl => {
      loadingEl.present();
      this.characterService.character
        .pipe(
          take(1)
        )
        .subscribe( () => {
          loadingEl.dismiss();
        }, (error: IllegalStateError) => {
          loadingEl.dismiss();
          this.alertCtrl.create({
            header: 'Errore nel caricamento del personaggio',
            subHeader: 'Riprova più tardi',
            message: `${error.message} ${ !!error.reason ? error.reason : ''}`,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.authService.logout();
                  this.router.navigateByUrl('/tabs/home');}
              }
            ]
          }).then( alertEl => {
            alertEl.present();
          });
        });
    });
  }

}
