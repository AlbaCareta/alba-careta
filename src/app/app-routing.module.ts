import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { ConcertsComponent } from './components/concerts/concerts.component'
import { ProjectesComponent } from './components/projectes/projectes.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'es', component: HomeComponent},
  {path: 'en', component: HomeComponent},
  {path: 'concerts', component: ConcertsComponent},
  {path: 'es/conciertos', component: ConcertsComponent},
  {path: 'en/concerts', component: ConcertsComponent},
  {path: 'projectes', component: ProjectesComponent},
  {path: 'es/proyectos', component: ProjectesComponent},
  {path: 'en/projects', component: ProjectesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
