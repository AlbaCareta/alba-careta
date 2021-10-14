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

  constructor(private readonly afs: AngularFirestore) { }

  loadFirestoreContent(): void {
    this.afs.firestore
      .collection('concerts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.concerts.push(doc.data())
        })
      })
      .then(() => {
        console.log(this.concerts)
        this.concertsLoaded.next(true)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
