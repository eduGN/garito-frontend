import { Contact } from './contact.model';
import { Member } from './member.model';
export class Info {
  _id?: string;
  members?: Member[];
  contact?: Contact;
  bio?: string;
  genres?: string[];

}
