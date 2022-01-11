import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
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
  projectesIndex = 0

  @ViewChild('list') listER: ElementRef
  @ViewChild('arrow_left') arrowLeftER: ElementRef
  @ViewChild('arrow_right') arrowRightER: ElementRef

  constructor(private userService: UserService,
              private router: Router) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
    this.userService.projectesLoaded.subscribe((loaded) => {
      if (loaded) {
        let i , j
        const chunk = 4
        for (i = 0, j = this.userService.projectes.length; i < j; i += chunk) {
          this.projectes.push(this.userService.projectes.slice(i, i + chunk))
        }
        gsap.timeline({delay: .24})
          .to(this.listER.nativeElement, {opacity: 1})
        this.setArrowsOpacity()
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

  navigateProjectes(direction: string): void {
    if (direction === 'left') {
      if (this.projectesIndex > 0) {
        const tween_left = gsap.to(this.listER.nativeElement, {opacity: 0})
        tween_left.eventCallback('onComplete', () => {
          this.projectesIndex--
          this.setArrowsOpacity()
        })
        gsap.timeline({delay: 1})
          .to(this.listER.nativeElement, {opacity: 1})
      }
    } else if ((direction === 'right')) {
      if (this.projectesIndex < this.projectes.length - 1) {
        const tween_right = gsap.to(this.listER.nativeElement, {opacity: 0})
        tween_right.eventCallback('onComplete', () => {
          this.projectesIndex++
          this.setArrowsOpacity()
        })
        gsap.timeline({delay: 1})
          .to(this.listER.nativeElement, {opacity: 1})
      }
    }
  }

  setArrowsOpacity(): void {
    if (this.projectesIndex === 0) {
      gsap.to(this.arrowLeftER.nativeElement, {opacity: .25})
    } else {
      gsap.to(this.arrowLeftER.nativeElement, {opacity: 1})
    }
    if (this.projectesIndex === this.projectes.length - 1) {
      gsap.to(this.arrowRightER.nativeElement, {opacity: .25})
    } else {
      gsap.to(this.arrowRightER.nativeElement, {opacity: 1})
    }
  }

}
