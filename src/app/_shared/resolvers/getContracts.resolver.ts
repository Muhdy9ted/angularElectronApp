import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Contract } from "../models/contracts.model";
import { FirestoreDbService } from "../services/firestore-db.service";

@Injectable()
export class GetContractsResolver implements Resolve<Contract[]>{

    constructor(private firestoreService: FirestoreDbService, private router: Router){}

    resolve():any{
        let  contracts = this.firestoreService.getContracts().subscribe(res=>{
            console.log(res)
        });
        console.log(contracts)
        return contracts
        // return this.firestoreService.getContracts();
    }
}