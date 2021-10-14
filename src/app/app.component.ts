import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Alba Careta'

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
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
  }
}
