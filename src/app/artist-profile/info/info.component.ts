import { GuardService } from './../../services/auth/guard.service';
import { genresList } from './../../models/genres.list';
import { Member } from './../../models/member.model';
import { Contact } from './../../models/contact.model';
import { Info } from './../../models/info.model';
import { InfoService } from './../../services/info/info.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from './../../services/user.service';
import { faTimesCircle, faPlus, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  info = new Info()
  genresToSubmit: string[] = []
  genresList: string[] = genresList
  bio: string = ""
  members: Member[] = []
  contact = new Contact()
  genrestoShow : string = ""
  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  editIcon = faEdit
  addIcon = faPlus
  genresHidden = true
  username: string = ""
  canEdit : boolean = false

/*   biotext = "LOS ESTANQUES son una banda de pop psicodélico afincada en Madrid, nacida a raíz de una serie de composiciones de Iñigo Bregel (voz, teclado y guitarra), componente de la formación cántabra CrayoLáser. Estas canciones fueron el impulso para formar Los Estanques, una propuesta de rock psicodélico en castellano formada actualmente por el propio Iñigo Bregel, Germán Herrero (guitarra), Daniel Pozo (bajo) y Andrea Conti (batería). Con influencias de grupos como Soft Machine, Gong, Caravan o Génesis, Los Estanques autoeditaron su primer disco en 2017 bajo el título ”Contiene Percal”, el cual no tardó en asombrar a los medios especializados por su capacidad para volver al sonido más puro del rock de los años setenta de un modo fresco y auténtico, que tuvo su continuidad con 'II'(The John Colby Sect/Inbophonic) y una visión clara: saciar a los amantes del pop rock psicodélico y a los nostálgicos de los setenta. 2019 lo arrancan con su tercer trabajo, llamado ‘Los Estanques”: 13 canciones que conforman un disco donde fusionan magistralmente estilos tan diversos como el pop, el rock, la psicodelia, el progresivo, el funk, el soul o el jazz. Las melodías pop a las que nos tienen acostumbrados se sustentan en este trabajo sobre complejos arreglos de tinte progresivo, actualizando sonidos añejos y dando lugar a un juego de percepción con el oyente basado en la sorpresa. Haciendo alarde de la frescura que les caracteriza, y tras recibir reconocimiento unánime de toda la prensa musical o ser nominados a galardones como los Premios RUIDO 2020, la variedad estilística compilada se transforma en su cuatro disco, IV, con la que es ya la marca de la casa: lo que ellos mismos han denominado Pop Progresivo Psicodélico. Ya bajo su propio sello, Inbophonic Records, pasean desde las llanuras del pop hasta los vericuetos de la psicodelia y el progresivo sin despeinarse, con 13 canciones y 12 personajes cuyas historias y situaciones narran a través de la música. Un disco que tuvo que re-grabarse desde cero tras haber sufrido el robo de la copia final, pero que sin duda ha marcado una dirección que seguir: el camino de hacer las mejores canciones y los mejores directos posibles. Ese es su gran reto, y por ahora y a juzgar por la luz que se desprende, van por el buen camino"
 */
  constructor(private modal: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private infoService: InfoService,
    private userService: UserService,
    private guardService: GuardService,
    private activatedRoute: ActivatedRoute) {}

    openModalForm(content: TemplateRef<any>){
      this.modal.open(content)
    }


  loadData(){

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

  ngOnInit() {
    this.loadData()
    this.router.events.subscribe(event=>{
       console.log(event)
       if(event instanceof NavigationEnd){
        this.loadData()
       }
     })

  }

  showEditGenres(){
    this.genresHidden = !this.genresHidden
    console.log(this.genresHidden)
  }

  loadInfo(){
    this.loadContact()
    this.info.bio = this.bio
    this.info.contact = this.contact
    this.info.genres = this.genresToSubmit
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
    this.genrestoShow = this.info.genres? this.formatGenres(this.info.genres) : ""
    this.genresToSubmit = data.info.genres
  }

  sendData(){

    const info = new Info()
    info.bio = this.bio
    info.contact = this.contact
    info.genres = this.genresToSubmit
    info.members = this.members
    this.genresHidden = true

    this.infoService.updateInfo(info).subscribe((data:any) => {
      console.log(data.info)
      this.loadData()
    })
  }

  formatGenres(genres: string[]): string{
    return genres.reduce((acc, genre)=> {
      acc+= genre + ", "
      return acc
    }, "").slice(0,-2)
  }

}
