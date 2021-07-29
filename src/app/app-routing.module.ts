import { ContactComponent } from './artist-profile/contact/contact.component';
import { DiscographyComponent } from './artist-profile/discography/discography.component';
import { MembersComponent } from './artist-profile/members/members.component';
import { InfoComponent } from './artist-profile/info/info.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoverComponent } from './cover/cover.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent} from './register/register.component';

const routes: Routes = [
 { path: "", component: CoverComponent, pathMatch: "full"},
 { path: "home", component: CoverComponent},
 { path: "search", component: SearchComponent },
 { path: "login", component: LoginComponent },
 { path: "signup", component: RegisterComponent },
 { path: ":username", component: ArtistProfileComponent, children:
  [
    { path: "", component: InfoComponent},
    { path: "members", component: MembersComponent },
    { path: "discography", component: DiscographyComponent },
    { path: "contact", component: ContactComponent }
    ]
   },
 { path: "404", component: NotFoundComponent },
 { path: "**", redirectTo: "/404" },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    paramsInheritanceStrategy: 'always'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
