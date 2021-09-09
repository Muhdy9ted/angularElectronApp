import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Contract } from '../models/contracts.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {

  contractDoc!: AngularFirestoreDocument<Contract>;

  contracts: Observable<Contract[]>
  constructor(public fireservice: AngularFirestore) { 
    this.contracts = this.fireservice.collection<Contract>('contracts').snapshotChanges().pipe(map(
      changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Contract;
          data.id = a.payload.doc.id
          return data;
        })
      }
    )); 
  }

  createContract(contract: Contract){
    return this.fireservice.collection('contracts').add(contract); 
  }

  getContracts(){
    return this.contracts;
  }

  updateContract(contract: Contract){
    this.contractDoc = this.fireservice.doc(`contracts/${contract.id}`);
    return this.contractDoc.update(contract)
  }

  deleteContract(contract: Contract){
    this.contractDoc = this.fireservice.doc(`contracts/${contract.id}`);
    return this.contractDoc.delete();
  }
}
