import { GuardService } from './../../services/auth/guard.service';
import { MemberService } from './../../services/member/member.service';
import { Member } from './../../models/member.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimesCircle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: Member[] = []
  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  addIcon = faPlus
  mForm: FormGroup
  isSent: boolean = false
  canEdit: boolean = false

  constructor(private modal: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private memberService : MemberService,
    private userService: UserService,
    private guardService: GuardService,
    private activatedRoute : ActivatedRoute) {
      this.mForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s]+[a-zA-Z0-9]$/)]],
        role: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s,\.]+[a-zA-Z0-9]$/)]],
        picture: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9-_\.]+\.[a-zA-Z0-9]{2,4}/)]]
       })
     }

  openModalForm(content: TemplateRef<any>){
    this.modal.open(content)
  }

  get f() {
    return this.mForm.controls
  }

  onSubmit() {

    this.isSent = true

    console.log("Enviar form");

    if (this.mForm.invalid) {
      return
    }
    /*Hacer llamada al service
    Hacer dos servicios: user, people
    llamar al servicio de login y en la respuesta guardar en el localStorage el token y redirigir al DASHBOARD
    */

    const member: Member = new Member()

    member.name = this.f.name?.value
    member.picture = this.f.picture?.value
    member.role = this.f.role?.value

    console.log(member)

    this.memberService.saveMember(member).subscribe((data: any) => {
      console.log(data)
      this.ngOnInit()
    },
      error => {
        console.log("Error:", error);
      }
    );

 }

  ngOnInit() {

    let username = this.activatedRoute.parent?.snapshot.params["username"]
    const usernameLS = localStorage.getItem("username")
    if (usernameLS && usernameLS == username && this.guardService.canActivate()) {
      this.canEdit = true
    }

    if (username) {
      this.userService.getUser(username).subscribe((data: any) => {
        if(data.info && data.info.members){
          this.members = data.info.members as  Member[]
         }
         console.log(this.members)
      }, error => {
        console.log("Error:", error);
      })
    } else {
      console.log("No existe username")
    }
  }

}
