import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/_shared/models/contracts.model';
import { FirestoreDbService } from 'src/app/_shared/services/firestore-db.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {

  contract: Contract;

  constructor(private firestore: FirestoreDbService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.contract = data.post.data;
      console.log(data)
    })
  }

}
