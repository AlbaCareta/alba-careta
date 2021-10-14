import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

import { UserService } from './services/user.service'

import { HomeComponent } from './components/home/home.component'


const firebaseConfig = {
  apiKey: 'AIzaSyDoQ6qba8Z5PK3WsjZYcl7KttHfH-A2HMk',
  authDomain: 'alba-careta.firebaseapp.com',
  projectId: 'alba-careta',
  storageBucket: 'alba-careta.appspot.com',
  messagingSenderId: '447259750871',
  appId: '1:447259750871:web:b7a340aa2c74211665db92'
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
