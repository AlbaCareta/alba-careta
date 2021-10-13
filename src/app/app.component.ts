import { Component, OnInit } from '@angular/core'
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Alba Careta'

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('language') === null) {
      this.userService.userLanguage = 'ca'
    } else {
      this.userService.userLanguage = localStorage.getItem('language')
    }
  }
}
