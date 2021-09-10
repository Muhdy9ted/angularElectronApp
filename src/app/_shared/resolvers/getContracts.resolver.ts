import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, first, map, take } from "rxjs/operators";
import { Contract } from "../models/contracts.model";
import { FirestoreDbService } from "../services/firestore-db.service";

@Injectable()
export class GetContractsResolver implements Resolve<Contract[]>{

    constructor(private firestoreService: FirestoreDbService, private router: Router){}

    resolve():any{
        return this.firestoreService.getContracts().pipe(take(1));
    }
}