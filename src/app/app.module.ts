import { ContactComponent } from './artist-profile/contact/contact.component';
import { InfoComponent } from './artist-profile/info/info.component';
import { MembersComponent } from './artist-profile/members/members.component';
import { DiscographyComponent } from './artist-profile/discography/discography.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule, MatOption, MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CoverComponent } from './cover/cover.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptors/interceptor.service';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      FooterComponent,
      CoverComponent,
      NotFoundComponent,
      SearchComponent,
      ArtistProfileComponent,
      LoginComponent,
      RegisterComponent,
      DiscographyComponent,
      MembersComponent,
      InfoComponent,
      ContactComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
