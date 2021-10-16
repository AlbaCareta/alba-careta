import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service'
import { gsap } from 'gsap'
import {Router} from '@angular/router'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  lang
  items = [
    {
      name: {
        ca: 'Home',
        es: 'Home',
        en: 'Home'
      },
      route: {
        ca: '',
        es: '/es/',
        en: '/en/'
      }
    },
    {
      name: {
        ca: 'Biografia',
        es: 'Biografía',
        en: 'Biography'
      },
      route: {
        ca: '/biografia/',
        es: '/es/biografia/',
        en: '/en/biography/'
      }
    },
    {
      name: {
        ca: 'Concerts',
        es: 'Conciertos',
        en: 'Concerts'
      },
      route: {
        ca: '/concerts/',
        es: '/es/conciertos/',
        en: '/en/concerts/'
      }
    },
    {
      name: {
        ca: 'Projectes',
        es: 'Proyectos',
        en: 'Projects'
      },
      route: {
        ca: '/projectes/',
        es: '/es/proyectos/',
        en: '/en/projects/'
      }
    },
    {
      name: {
        ca: 'Albums',
        es: 'Álbumes',
        en: 'Albums'
      },
      route: {
        ca: '/albums/',
        es: '/es/albumes/',
        en: '/en/albums/'
      }
    },
    {
      name: {
        ca: 'Contacte',
        es: 'Contacto',
        en: 'Contact'
      },
      route: {
        ca: '/contacte/',
        es: '/es/contacto/',
        en: '/en/contact/'
      }
    }
  ]

  @ViewChild('layout') layoutER: ElementRef

  constructor(private userService: UserService, private router: Router) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.userService.showNavigation.subscribe((value) => {
      if (value) {
        gsap.to(this.layoutER.nativeElement, {opacity: 1, pointerEvents: 'auto', duration: .24})
      } else {
        gsap.to(this.layoutER.nativeElement, {opacity: 0, pointerEvents: 'none', duration: .24})
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

  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.userService.showNavigation.next(false)
    })

  }

}
