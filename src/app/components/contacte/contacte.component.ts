import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-contacte',
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.scss']
})
export class ContacteComponent implements OnInit {

  lang

  tags = {
    h1: {
      ca: 'Contacte',
      es: 'Contacto',
      en: 'Contact'
    },
    press: {
      ca: 'Premsa',
      es: 'Prensa',
      en: 'Press'
    },
    form: {
      h2: {
        ca: 'Contacta',
        es: 'Contacta',
        en: 'Contact us'
      },
      name: {
        ca: 'Nom',
        es: 'Nombre',
        en: 'Name'
      },
      mail: {
        ca: 'Correu electrònic',
        es: 'Correo electrónico',
        en: 'E-Mail'
      },
      message: {
        ca: 'Missatge',
        es: 'Mensaje',
        en: 'Message'
      },
      send: {
        ca: 'Envia',
        es: 'Envía',
        en: 'Send'
      }
    }
  }

  formGroup

  constructor(private userService: UserService) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
  }

}
