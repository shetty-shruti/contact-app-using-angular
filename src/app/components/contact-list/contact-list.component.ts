import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '../../model/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  constructor(private contactService: ContactService,private router: Router) { }

  ngOnInit() {
    this.getAllContacts();
  }
  
/**
 * Lists all contacts that exist in the phone book
 *
 * @memberof ContactListComponent
 */
getAllContacts(): void{
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  openModal(id: string){
    this.router.navigate(['/home/contact/' + id]);
  }

  openAddContact(){
    this.router.navigate(['/home/add/']);
  }

  

}
