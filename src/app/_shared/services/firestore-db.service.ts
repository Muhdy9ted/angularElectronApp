import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Contract } from '../models/contracts.model';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {
  contractDoc!: AngularFirestoreDocument<Contract>;

  contracts: Observable<Contract[]>
  constructor(public fireservice: AngularFirestore, private readonly location:Location) { 
    this.contracts = this.fireservice.collection<Contract>('contracts').snapshotChanges().pipe(map(
      changes => {
        console.log(changes)
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
    console.log(this.contracts)
    return this.contracts;
  }

  getContracts2(){
    this.fireservice.collection<Contract>('contracts').snapshotChanges().subscribe(res=>{
      console.log(res)
    })
  }
  getContract(contract: Contract){
    return this.fireservice.collection('contracts').doc(`${contract.id}`).valueChanges()
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
