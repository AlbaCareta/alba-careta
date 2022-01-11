import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class BiografiaService {

  bio
  bio_loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private readonly afs: AngularFirestore) {
  }

  loadBio(): void {
    this.afs.firestore
      .collection('CMS')
      .doc('biografia')
      .get()
      .then((docSnapshot) => {
        this.bio = docSnapshot.data()
      })
      .then(() => {
        this.bio_loaded.next(true)
      })
  }
}
