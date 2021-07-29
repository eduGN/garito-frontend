import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  genres: Array<String> = ["Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge",
  "Hip-Hop","Jazz","Metal","New Age","Oldies","Other","Pop","R&B",
  "Rap","Reggae","Rock","Techno","Industrial","Alternative","Ska",
  "Death Metal","Pranks","Soundtrack","Euro-Techno","Ambient",
  "Trip-Hop","Vocal","Jazz+Funk","Fusion","Trance","Classical",
  "Instrumental","Acid","House","Game","Sound Clip","Gospel",
  "Noise","AlternRock","Bass","Soul","Punk","Space","Meditative",
  "Instrumental Pop","Instrumental Rock","Ethnic","Gothic",
  "Darkwave","Techno-Industrial","Electronic","Pop-Folk",
  "Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta",
  "Top 40","Christian Rap","Pop/Funk","Jungle","Native American",
  "Cabaret","New Wave","Psychadelic","Rave","Showtunes","Trailer",
  "Lo-Fi","Tribal","Acid Punk","Acid Jazz","Polka","Retro",
  "Musical","Rock & Roll","Hard Rock","Folk","Folk-Rock",
  "National Folk","Swing","Fast Fusion","Bebob","Latin","Revival",
  "Celtic","Bluegrass","Avantgarde","Gothic Rock","Progressive Rock",
  "Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band",
  "Chorus","Easy Listening","Acoustic","Humour","Speech","Chanson",
  "Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus",
  "Porn Groove","Satire","Slow Jam","Club","Tango","Samba",
  "Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle",
  "Duet","Punk Rock","Drum Solo","Acapella","Euro-House","Dance Hall"]

  provincias: Array<String> = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

  artists: Array<Artist> =[
    {name: "Los estanques",
    picture:"https://1.bp.blogspot.com/-es43ATUYtUY/Xxg0zSwV06I/AAAAAAAARpI/EKvHgEyBvM8iZC1ZOx8Uge2R0udUfqjuACLcBGAsYHQ/s1600/los%2Bestanques.jpg"},
    {name: "Los estanques",
    picture:"https://1.bp.blogspot.com/-es43ATUYtUY/Xxg0zSwV06I/AAAAAAAARpI/EKvHgEyBvM8iZC1ZOx8Uge2R0udUfqjuACLcBGAsYHQ/s1600/los%2Bestanques.jpg"},
    {name: "Los estanques",
    picture:"https://1.bp.blogspot.com/-es43ATUYtUY/Xxg0zSwV06I/AAAAAAAARpI/EKvHgEyBvM8iZC1ZOx8Uge2R0udUfqjuACLcBGAsYHQ/s1600/los%2Bestanques.jpg"},
    {name: "Los estanques",
    picture:"https://1.bp.blogspot.com/-es43ATUYtUY/Xxg0zSwV06I/AAAAAAAARpI/EKvHgEyBvM8iZC1ZOx8Uge2R0udUfqjuACLcBGAsYHQ/s1600/los%2Bestanques.jpg"},
    {name: "Los estanques",
    picture:"https://1.bp.blogspot.com/-es43ATUYtUY/Xxg0zSwV06I/AAAAAAAARpI/EKvHgEyBvM8iZC1ZOx8Uge2R0udUfqjuACLcBGAsYHQ/s1600/los%2Bestanques.jpg"},
    {name: "Los estanques",
    picture:"https://1.bp.blogspot.com/-es43ATUYtUY/Xxg0zSwV06I/AAAAAAAARpI/EKvHgEyBvM8iZC1ZOx8Uge2R0udUfqjuACLcBGAsYHQ/s1600/los%2Bestanques.jpg"},
    {name: "Camellos",
    picture:"https://murciaplaza.com/public/Image/2020/4/81350789_2687418118012937_8336116490256252928_o_NoticiaAmpliada.jpg"},
    {name: "Los estanques",
    picture:"https://1.bp.blogspot.com/-es43ATUYtUY/Xxg0zSwV06I/AAAAAAAARpI/EKvHgEyBvM8iZC1ZOx8Uge2R0udUfqjuACLcBGAsYHQ/s1600/los%2Bestanques.jpg"}
  ]

  ngOnInit() {
  }

}
