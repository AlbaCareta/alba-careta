import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lang

  elements = {
    h1: 'Alba\n Careta',
    hero_01: {
      ca: 'Escolta',
      es: 'Escucha',
      en: 'Listen'
    },
    hero_02: {
      ca: 'Concerts',
      es: 'Conciertos',
      en: 'Concerts'
    }
  }

  constructor(private userService: UserService) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
  }

}
