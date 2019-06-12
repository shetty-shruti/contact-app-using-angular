import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './../model/contact';
 const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  private contactsUrl = 'https://phoneafriend.herokuapp.com/users';

//   /** GET Contacts from the server */
getContacts (): Observable<Contact[]> {
  return this.http.get<Contact[]>(this.contactsUrl)
    .pipe(
      tap(_ => this.log('fetched Contacts')),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
}

/** GET Contact by id. Will 404 if id not found */
getContact(id: number): Observable<Contact> {
  const url = `${this.contactsUrl}/${id}`;
  return this.http.get<Contact>(url).pipe(
    tap(_ => this.log(`fetched Contact id=${id}`)),
    catchError(this.handleError<Contact>(`getHero id=${id}`))
  );
}

/** POST: add a new Contact to the server */
addNewContact(contact: Contact): Observable<Contact> {
  console.log(contact.firstName);  
  return this.http.post<Contact>(this.contactsUrl, contact, httpOptions).pipe(
    tap((newContact: Contact) => this.log(`added Contact w/ id=${newContact._id}`)),
    catchError(this.handleError<Contact>('add Contact'))
  );
//   return fetch(this.contactsUrl, {
//     method: 'POST',
//     body: JSON.stringify(contact),
//     credentials: 'include',
//     headers: {
//       'content-type': 'application/json'
//     }

//   }).then(response => {
//     if (response.headers.get('content-type') != null) {
//       return response.json();
//     } else {
//       return null;
//     }
// });
}

 
  /**
   * 
   * @param contactId delete the contact with the given id  
   */
  deleteContact(contactId: string) {
    const url = `${this.contactsUrl}/${contactId}`;
    return this.http.delete<Contact>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Contact id=${contactId}`)),
      catchError(this.handleError<Contact>('deleteHero'))
    );
    // return fetch(this.contactsUrl + '/' + contactId, {
    //   method: 'DELETE',
    //   credentials: 'include',
    // }).then(response => {
    //   if (response.headers.get('content-type') != null) {
    //     return response.json();
    //   } else {
    //     return null;
    //   }
    // });
  }


   /** PUT: update the hero on the server */
   updateContact (contact: Contact,id: string): Observable<any> {
    const updateUrl = `${this.contactsUrl}/${id}`;
    return this.http.put(updateUrl, contact, httpOptions).pipe(
      tap(_ => this.log(`updated Contact id=${id}`)),
      catchError(this.handleError<any>('Update Contact'))
    );
  }
   

/** Log a ContactService message with the MessageService */
private log(message: string) {
  console.log(`ContactService: ${message}`);
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}


