import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLanguage = 'ca'

  concerts = []
  concertsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  projectes = []
  projectesLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  showNavigation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private readonly afs: AngularFirestore) { }

  loadFirestoreContent(): void {
    // Concerts
    const preFilterArray = []
    const dateRef = new Date()
    dateRef.setHours(-24, 0, 0, 0)

    this.afs.firestore
      .collection('concerts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          preFilterArray.push(doc.data())
        })
      })
      .then(() => {
        for (const i of preFilterArray) {
          const concertDate = new Date (i.date.seconds * 1000)
          if (dateRef.getTime() < concertDate.getTime() && !i.private) {
            this.concerts.push(i)
          }
        }
        this.concerts.sort((a, b) =>
          new Date(a.date.seconds * 1000).getTime() - new Date(b.date.seconds * 1000).getTime())
        this.concertsLoaded.next(true)
      })
      .catch(err => {
        console.log(err)
      })

    // Projectes
    this.afs.firestore
      .collection('projectes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (!doc.data()['private']) {
            this.projectes.push(doc.data())
          }
        })
      })
      .then(() => {
        this.projectes.sort((a, b) => a['order'] - b['order'])
        this.projectesLoaded.next(true)
        console.log(this.projectes)
      })
      .catch(err => {
        console.log(err)
      })

  }
}
