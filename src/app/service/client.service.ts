import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: AngularFirestore) { }

  addClient(client: any): Promise<any> {
    return this.firestore.collection('clients').add(client);
  }

  getClients(): Observable<any> {
    return this.firestore.collection('clients', ref => ref.orderBy('createDate', 'asc')).snapshotChanges();
  }

  deleteClient(id: string): Promise<any> {
    return this.firestore.collection('clients').doc(id).delete();
  }

  getClient(id: string): Observable<any> {
    return this.firestore.collection('clients').doc(id).snapshotChanges();
  }

  editClient(id: string, data:any): Promise<any> {
    return this.firestore.collection('clients').doc(id).update(data);
  }
}
