import { Injectable } from "@angular/core";
import { DocumentSnapshot } from "@angular/fire/compat/firestore";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Contract } from "../models/contracts.model";
import { FirestoreDbService } from "../services/firestore-db.service";

@Injectable()
export class GetContractResolver implements Resolve<Contract>{
    
    constructor(private firestoreService: FirestoreDbService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<any>{
        console.log(route.params)
        return this.firestoreService.getContract(route.params.contractId);
    }
}