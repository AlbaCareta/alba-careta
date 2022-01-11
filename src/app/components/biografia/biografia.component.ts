import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { BiografiaService } from '../../services/biografia.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-biografia',
  templateUrl: './biografia.component.html',
  styleUrls: ['./biografia.component.scss']
})
export class BiografiaComponent implements OnInit {

  lang

  biografia = {
    ca: '',
    es: '',
    en: ''
  }

  tags = {
    h1: {
      ca: 'Hola!\nSóc\nl\'Alba',
      es: 'Hola!\nSoy\nAlba',
      en: 'Hello!\nI am\nAlba'
    }
  }

  constructor(private userService: UserService,
              private biografiaService: BiografiaService,
              private router: Router) {
    this.lang = userService.userLanguage
  }

  ngOnInit(): void {
    this.biografiaService.bio_loaded.subscribe((loaded) => {
      if (loaded) {
        this.biografia = this.biografiaService.bio
      } else {
        this.biografiaService.loadBio()
      }
    })
  }

  routeContacte() {
    if (this.lang === 'ca') {
      this.router.navigate(['/contacte/']).then()
    } else if (this.lang === 'es') {
      this.router.navigate(['/es/contacto/']).then()
    } else if (this.lang === 'en') {
      this.router.navigate(['/en/contact/']).then()
    }
  }

}
