import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { gsap } from 'gsap'

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {

  lang

  elements = {
    h1: {
      ca: 'Concerts',
      es: 'Conciertos',
      en: 'Concerts'
    }
  }

  concertsArray = []

  constructor(private userService: UserService) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
    this.userService.concertsLoaded.subscribe((loaded) => {
      if (loaded) {
        this.filterConcerts()
      }
    })
  }

  filterConcerts(): void {
    const years = []
    let uniqueYears
    for (const i of this.userService.concerts) {
      const year = new Date(i['date'].seconds * 1000).getUTCFullYear()
      years.push(year)
    }
    uniqueYears = [...new Set(years)]
    for (const i of uniqueYears) {
      this.concertsArray.push({
        year: i,
        concerts: []
      })
    }
    for (const i of this.userService.concerts) {
      let year = new Date(i['date'].seconds * 1000).getUTCFullYear()
      for (let j = 0; j < this.concertsArray.length; j++) {
        if (year === this.concertsArray[j]['year']) {
          this.concertsArray[j]['concerts'].push(i)
        }
      }
    }
  }

  elementsAnimation(action: number, elem: HTMLElement): void {
    if (action === 0) {
      gsap.set(elem, {textDecorationLine: 'underline'})
    } else {
      gsap.set(elem, {textDecorationLine: 'none'})
    }
  }
}
