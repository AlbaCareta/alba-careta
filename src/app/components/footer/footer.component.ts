import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { gsap } from 'gsap'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  lang

  elements = {
    legal: {
      ca: 'Avís legal',
      es: 'Aviso legal',
      en: 'Legal notice'
    }
  }

  constructor(private userService: UserService) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
  }

  elementsAnimation(action: number, elem: HTMLElement): void {
    if (action === 0) {
      gsap.set(elem, {textDecorationLine: 'underline'})
    } else {
      gsap.set(elem, {textDecorationLine: 'none'})
    }
  }

}
