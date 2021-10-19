import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { gsap } from 'gsap'


@Component({
  selector: 'app-projectes',
  templateUrl: './projectes.component.html',
  styleUrls: ['./projectes.component.scss']
})
export class ProjectesComponent implements OnInit {

  lang

  elements = {
    h1: {
      ca: 'Projectes',
      es: 'Proyectos',
      en: 'Projects'
    },
    link_01: {
      ca: 'Escolta',
      es: 'Escucha',
      en: 'Listen'
    },
    link_02: {
      ca: 'Concerts',
      es: 'Conciertos',
      en: 'Concerts'
    }
  }

  projectes = []

  constructor(private userService: UserService,
              private router: Router) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
    this.userService.projectesLoaded.subscribe((loaded) => {
      if (loaded) {
        this.projectes = this.userService.projectes
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
