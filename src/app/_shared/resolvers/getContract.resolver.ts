import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot } from "@angular/fire/compat/firestore";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Contract } from "../models/contracts.model";
import { FirestoreDbService } from "../services/firestore-db.service";

@Injectable()
export class GetContractResolver implements Resolve<Contract>{
    
    constructor(private firestoreService: FirestoreDbService, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute){}

    resolve(route: ActivatedRouteSnapshot): Observable<Contract>{
        return this.firestore.collection<Contract>('contracts').doc(`${this.route.snapshot.params.contractId}`).valueChanges();
    }
}

// resolve():any{
//     return this.firestoreService.getContracts().pipe(take(1));
// }