import { GuardService } from './../../services/auth/guard.service';
import { Info } from './../../models/info.model';
import { Member } from './../../models/member.model';
import { Contact } from './../../models/contact.model';
import { InfoService } from './../../services/info/info.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from './../../services/user.service';
import { faTimesCircle, faPlus, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  info = new Info()
  genres: string[] = []
  bio: string = ""
  members: Member[] = []
  contact = new Contact()
  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  editIcon = faEdit
  addIcon = faPlus
  username: string = ""
  canEdit : boolean = false

  constructor(
    private modal: NgbModal,
    private router: Router,
    private infoService: InfoService,
    private userService: UserService,
    private guardService: GuardService,
    private activatedRoute: ActivatedRoute) { }

  openModalForm(content: TemplateRef<any>) {
    this.modal.open(content)
  }

  sendData() {

    const info = new Info()
    info.bio = this.bio
    info.contact = this.contact
    info.genres = this.genres
    info.members = this.members
    console.log(info)

    this.infoService.updateInfo(info).subscribe((data: any) => {
      console.log(data.info)
      this.ngOnInit()
    })
  }

  loadInfo(){
    this.loadContact()
    this.info.bio = this.bio
    this.info.contact = this.contact
    this.info.genres = this.genres
    this.info.members = this.members
  }

  loadContact(){
    this.contact.address =""
    this.contact.email =""
    this.contact.message =""
    this.contact.web =""
    this.contact.phone =""

  }

  bindData(data: any){
    this.username = data.username
    this.info = data.info as Info
    this.bio = data.info.bio
    this.members = data.info.members as Member[]
    this.contact = data.info.contact as Contact
    this.genres = data.info.genres
  }


  ngOnInit() {

    let username = this.activatedRoute.parent?.snapshot.params["username"]
    const usernameLS = localStorage.getItem("username")
    if (usernameLS && usernameLS == username && this.guardService.canActivate()) {
      this.canEdit = true
    }

    if (username) {
      this.userService.getUser(username).subscribe((data: any) => {
        if(data.info){
          this.bindData(data)
         } else {
          this.loadInfo()
         }
         console.log(this.info)
      }, error => {
        console.log("Error:", error);
      })
    } else {
      console.log("No existe username")
    }
  }

}
