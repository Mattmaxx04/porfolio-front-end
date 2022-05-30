import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PorfolioComponent } from './components/porfolio/porfolio.component';


const routes: Routes = [
  { path: '', component: PorfolioComponent },
  { path: 'login', component: LoginComponent },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
