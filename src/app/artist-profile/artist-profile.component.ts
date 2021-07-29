import { GuardService } from './../services/auth/guard.service';
import { SocialService } from './../services/social/social.service';
import { Social } from './../models/social.model';
import { AuthService } from './../services/auth/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { faSpotify, faTwitch, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle, faPlus, faTimes, faEdit, faEthernet } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.scss']
})
export class ArtistProfileComponent implements OnInit {

    constructor( private modal: NgbModal,
      private router: Router,
      private userService: UserService,
      private guardService: GuardService,
      private socialService : SocialService,
      private activatedRoute: ActivatedRoute) {

       }

  public navbarCollapsed = true;

  faSpotify = faSpotify;
  faInstagram = faInstagram;
  faSoundcloud = faSoundcloud;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faTwitter = faTwitter;
  faTwitch = faTwitch;
  faEthernet = faEthernet;
  social = new Social()
  username: string = ""
  canEdit : boolean = false

  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  editIcon = faEdit
  addIcon = faPlus

  socialNetworks: any = []

  openModalForm(content: TemplateRef<any>){
    this.modal.open(content)
  }

  sendData(){

    console.log(this.social)
    this.socialService.updateSocial(this.social).subscribe((data:any) => {
      this.ngOnInit()
    })

  }

  addSocialNetworkToArray(){

    this.socialNetworks = [
    {
      link: this.social.soundcloud,
      icon: faSoundcloud,
      title: "Soundcloud"
    },
    {
      link: this.social.youtube,
      icon: faYoutube,
      title: "Youtube"
    },
    {
      link: this.social.instagram,
      icon: faInstagram,
      title: "Instagram"
    },
    {
      link: this.social.facebook,
      icon: faFacebook,
      title: "Facebook"
    },
    {
      link: this.social.twitter,
      icon: faTwitter,
      title: "Twitter"
    },
    {
      link: this.social.spotify,
      icon: faSpotify,
      title: "Spotify"
    },
    {
      link: this.social.web,
      icon: faEthernet,
      title: "Web"
    },
    {
      link: this.social.twitch,
      icon: faTwitch,
      title: "Twitch"
    }
  ]

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const usernameLS = localStorage.getItem("username")
      let username = params['username']

      if(usernameLS && usernameLS == username && this.guardService.canActivate()) {
        this.canEdit = true
      }

      if (username) {
        this.username = username
        this.userService.getUser(username).subscribe((data:any)=>{
          this.social = data.social
          this.addSocialNetworkToArray()
          console.log(data)
        },error => {
          console.log("Error:", error);
          this.router.navigate(['/'])
        })
      } else  {
         this.router.navigate(['/'])
      }

    })


  }
}
