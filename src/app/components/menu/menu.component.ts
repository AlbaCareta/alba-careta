import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { gsap } from 'gsap'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  lang: string
  langElements
  langAnimationTO

  @ViewChild('ca') caER: ElementRef
  @ViewChild('es') esER: ElementRef
  @ViewChild('en') enER: ElementRef

  @ViewChild('line_top') lineTopER: ElementRef
  @ViewChild('line_center') lineCenterER: ElementRef
  @ViewChild('line_bottom') lineBottomER: ElementRef
  @ViewChild('line_cross') lineCrossER: ElementRef

  constructor(private userService: UserService,
              private router: Router) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.langElements = [this.caER.nativeElement, this.esER.nativeElement, this.enER.nativeElement]
    this.languageUnderline(this.lang)
  }

  openClose(): void {
    if (this.userService.showNavigation.value === false) {
      this.userService.showNavigation.next(true)
      gsap.timeline()
        .to(this.lineCenterER.nativeElement, {width: 0})
        .to(this.lineTopER.nativeElement, {y: 6}, 0)
        .to(this.lineBottomER.nativeElement, {y: -6}, 0)
        .to(this.lineCrossER.nativeElement, {opacity: 1, duration: .24})
    } else {
      this.userService.showNavigation.next(false)
      gsap.timeline()
        .to(this.lineCrossER.nativeElement, {opacity: 0})
        .to(this.lineTopER.nativeElement, {y: 0}, 0)
        .to(this.lineBottomER.nativeElement, {y: 0}, 0)
        .to(this.lineCenterER.nativeElement, {width: '36px', duration: .24})

    }
  }

  selectLanguage(lang: string): void {
    this.userService.showNavigation.next(false)
    this.userService.userLanguage = lang
    if (this.userService.userLanguage === 'ca') {
      this.router.navigate(['']).then()
    } else if (this.userService.userLanguage === 'es') {
      this.router.navigate(['es']).then()
    } else if (this.userService.userLanguage === 'en') {
      this.router.navigate(['en']).then()
    }
  }

  languageUnderline(elem: string): void {
    if (elem === 'es') {
      gsap.set(this.esER.nativeElement, {textDecorationLine: 'underline'})
    } else if (elem === 'en') {
      gsap.set(this.enER.nativeElement, {textDecorationLine: 'underline'})
    } else {
      gsap.set(this.caER.nativeElement, {textDecorationLine: 'underline'})
    }
  }

  languageAnimation(action: number, elem: string): void {
    clearTimeout(this.langAnimationTO)
    gsap.timeline()
      .set([this.langElements], {textDecorationLine: 'none'})
      .call(() => {
        if (action === 0) {
          this.languageUnderline(elem)
        } else {
          this.langAnimationTO = setTimeout(() => {
            this.languageUnderline(this.lang)
          }, 240)
        }
      })
  }
}
