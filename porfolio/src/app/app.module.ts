import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectComponent } from './components/project/project.component';
import { SkillComponent } from './components/skill/skill.component';
import { SoftComponent } from './components/soft/soft.component';
import { PersonComponent } from './components/person/person.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PorfolioComponent } from './components/porfolio/porfolio.component';

import { PersonService } from './services/person.service';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { ProjectService } from './services/project.service';
import { SkillService } from './services/skill.service';
import { SoftService } from './services/soft.service';
import { AuthenticationService } from './services/authentication.service';
import { TokenService } from './services/token.service';
import { interceptorProvider } from './services/interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    EducationComponent,
    ExperienceComponent,
    HeaderComponent,
    NavbarComponent,
    ProjectComponent,
    SkillComponent,
    SoftComponent,
    PersonComponent,
    LoginComponent,
    LoaderComponent,
    PorfolioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [PersonService,EducationService,ExperienceService,ProjectService,
    SkillService,
    AuthenticationService,
    TokenService,
    interceptorProvider,SoftService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
