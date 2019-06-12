import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  contact: Contact;
  display = 'none';
  id: number;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(param => {
      this.id = param.id;
    });
  }

  ngOnInit() {
    this.viewDetails();
  }

  viewDetails(): any {
    this.display = "block";
    this.contactService.getContact(this.id).subscribe(contact => this.contact = contact);
  }

  onCloseHandled(): any {
    this.display = "none";
    this.router.navigate(['/home/list']);
  }

  deleteContact(id: string): any {
    this.contactService.deleteContact(id).subscribe(
      contact => {
        this.onCloseHandled();
      }
    )
  }

  updateContact(contact, id) {
    if (!contact) { return; }
    this.contactService.updateContact(contact.value, id).
    subscribe(contact => {
      this.onCloseHandled();
    });


  }


}
