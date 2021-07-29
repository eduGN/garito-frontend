import { GuardService } from './../../services/auth/guard.service';
import { UserService } from './../../services/user.service';
import { AlbumService } from './../../services/album/album.service';
import { Album } from './../../models/album.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimesCircle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-discography',
  templateUrl: './discography.component.html',
  styleUrls: ['./discography.component.scss']
})
export class DiscographyComponent implements OnInit {

  albums : Album[] = []
  songs : string[] = []
  songName: string = ""
  errorSong: boolean = false
  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  addIcon = faPlus
  mForm: FormGroup
  isSent: boolean = false
  canEdit : boolean = false

  constructor(private modal: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private albumService: AlbumService,
    private userService: UserService,
    private guardService: GuardService,
    private activatedRoute: ActivatedRoute) {
      this.mForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s]+[a-zA-Z0-9]$/)]],
        releaseDate: ['', [Validators.required, Validators.pattern(/^\d{4}([./-])\d{2}\1\d{2}$/)]],
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
      console.log(this.f.releaseDate.errors)
      return
    }
    /*Hacer llamada al service
    Hacer dos servicios: user, people
    llamar al servicio de login y en la respuesta guardar en el localStorage el token y redirigir al DASHBOARD
    */

    const album: Album = new Album()

    album.name = this.f.name?.value
    album.picture = this.f.picture?.value
    album.songs = this.songs
    album.releaseDate = this.f.releaseDate?.value

    console.log(album)

    this.albumService.saveAlbum(album).subscribe((data: any) => {
      console.log(data)
    },
      error => {
        console.log("Error:", error);
      }
    );

    this.songs = []
 }

  addSong() {
    if (this.songName.trim() != "") {
      this.songs.push(this.songName)
      this.songName = ""
    } else {
      this.errorSong = true
    }
  }

  removeSong(index: number){
    this.songs.splice(index,1)
  }


  addShowAttr(){
    const albums = this.albums.reduce((acc: Album[], album: Album)=>{

      let newAlbum: Album = {...album, show:false}
      acc.push(newAlbum)
      return acc

    },[])
    this.albums = albums
    console.log(this.albums)
  }

  ngOnInit() {

    let username = this.activatedRoute.parent?.snapshot.params["username"]
    const usernameLS = localStorage.getItem("username")
    if (usernameLS && usernameLS == username && this.guardService.canActivate()) {
      this.canEdit = true
    }

    if (username) {
      this.userService.getUser(username).subscribe((data: any) => {
        this.albums = data.discography as Album[]
        this.addShowAttr()
        console.log(this.albums)
      }, error => {
        console.log("Error:", error);
      })
    } else {
      console.log("No existe username")
    }
  }

}
