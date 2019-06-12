import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  display = 'none';
  contacts: Contact[];

  constructor(private router: Router, private contactService: ContactService) { }
/**
 *
 *  ng init component
 * @memberof AddContactComponent
 */
ngOnInit() {
    this.openAddDetails();
  }

  /**
   *
   * 
   * @memberof AddContactComponent
   */
  openAddDetails() {
    this.display = "block";
  }

  /**
   *
   *
   * @memberof AddContactComponent
   */
  onCloseHandled() {
    this.display = "none";
    this.router.navigate(['/home/list']);
  }

  /**
   *
   *
   * @param {*} contact - the new contact to be added
   * @returns {void}
   * @memberof AddContactComponent
   */
  addNewContact(contact): void {
    if (!contact) { return; }
    this.contactService.addNewContact(contact.value)
    .subscribe(contact => {
      this.onCloseHandled();
    });
    
  }
}
