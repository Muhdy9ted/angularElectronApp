import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Contract } from 'src/app/_shared/models/contracts.model';
import { FirestoreDbService } from 'src/app/_shared/services/firestore-db.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {

  contract: any;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private router: Router, private readonly location: Location) { }

  ngOnInit(): void {
    this.firestore.collection('contracts').doc(`${this.route.snapshot.params.contractId}`).valueChanges().subscribe(
      response => {
        console.log(response)
        this.contract = response;
      }
    )
  
  }

    goBack() {
      this.location.back()
    }
    
  

}
