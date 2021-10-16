import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { UserService } from './services/user.service'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Alba Careta'

  @ViewChild('main', {static: true}) mainER: ElementRef

  constructor(private afAuth: AngularFireAuth,
              private userService: UserService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit(): void {

    this.afAuth.authState.subscribe((user) => {
      if (!user) {
        this.afAuth.signInAnonymously()
          .then()
          .catch(err => {
            console.log(err)
          })
      } else {
        this.userService.loadFirestoreContent()
      }
    })
    this.userService.showNavigation.subscribe((value) => {
      if (value) {
        window.scroll(0, 0)
        disableBodyScroll(this.mainER.nativeElement)
      } else {
        enableBodyScroll(this.mainER.nativeElement)
      }
    })
  }

  ngOnDestroy(): void {
    clearAllBodyScrollLocks()
  }
}
