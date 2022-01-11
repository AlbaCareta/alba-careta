import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { ConcertsComponent } from './components/concerts/concerts.component'
import { ProjectesComponent } from './components/projectes/projectes.component'
import { BiografiaComponent } from './components/biografia/biografia.component'
import { ContacteComponent } from './components/contacte/contacte.component'
import { ProjecteComponent } from './components/projecte/projecte.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'es', component: HomeComponent},
  {path: 'en', component: HomeComponent},
  {path: 'concerts', component: ConcertsComponent},
  {path: 'es/conciertos', component: ConcertsComponent},
  {path: 'en/concerts', component: ConcertsComponent},
  {path: 'projectes', component: ProjectesComponent},
  {path: 'es/proyectos', component: ProjectesComponent},
  {path: 'en/projects', component: ProjectesComponent},
  {path: 'projectes/:id', component: ProjecteComponent},
  {path: 'es/projectes/:id', component: ProjecteComponent},
  {path: 'en/projectes/:id', component: ProjecteComponent},
  {path: 'biografia', component: BiografiaComponent},
  {path: 'es/biografia', component: BiografiaComponent},
  {path: 'en/biography', component: BiografiaComponent},
  {path: 'contacte', component: ContacteComponent},
  {path: 'es/contacto', component: ContacteComponent},
  {path: 'en/contact', component: ContacteComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
