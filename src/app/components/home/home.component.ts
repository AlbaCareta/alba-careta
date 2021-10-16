import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { Router } from '@angular/router'

gsap.registerPlugin(CSSPlugin)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lang: string
  concertsArray = []

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
    },
    concerts_01: {
      ca: 'més concerts',
      es: 'más conciertos',
      en: 'more concerts'
    }
  }

  constructor(private userService: UserService,
              private router: Router) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
    // Concerts
    this.userService.concertsLoaded.subscribe((loaded) => {
      if (loaded) {
        const preArray = this.userService.concerts.map(object => ({...object}))
        this.concertsArray = preArray.splice(0, 4)
      }
    })
  }

  elementsAnimation(action: number, elem: HTMLElement): void {
    if (action === 0) {
      gsap.set(elem, {textDecorationLine: 'underline'})
    } else {
      gsap.set(elem, {textDecorationLine: 'none'})
    }
  }

  navigateToConcerts(): void {
    if (this.lang === 'ca') {
      this.router.navigate(['concerts']).then()
    } else if (this.lang === 'es') {
      this.router.navigate(['/es/conciertos/']).then()
    } else if (this.lang === 'en') {
      this.router.navigate(['/en/concerts/']).then()
    }
  }

}
