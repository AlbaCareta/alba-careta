import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, CSSPlugin)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lang: string
  concertsArray = []
  projectesArray = []

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

  scrollTween

  @ViewChild('home') homeER: ElementRef
  @ViewChild('projectes') projectesER: ElementRef
  @ViewChild('projectes_container') projectesContainerER: ElementRef
  @ViewChild('footer') footerER: ElementRef

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
    // Projectes
    this.userService.projectesLoaded.subscribe((loaded) => {
      this.projectesArray = this.userService.projectes
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
