import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';

import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { FirestoreDbService } from 'src/app/_shared/services/firestore-db.service';
import { Contract } from '../../_shared/models/contracts.model'

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit {
  contracts: Contract[] = [];
  contract! : Contract;
  term!: string;
  
  constructor( private fireservice: FirestoreDbService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.searchTerm = debounce(this.searchTerm.bind(this), 500)
    this.fireservice.getContracts().subscribe(contracts => {
      console.log(contracts)
      this.contracts = contracts
    });
  }

  findWork(){
    window.open('https://www.google.com')
  }

  createContract(){
    let contract = {
      contractName: 'gigworks',
      clientName: 'VEProf',
      hours: '8:00 hrs',
      limit: 'no limit'
    }
    this.fireservice.createContract(contract).then((res) =>{
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  }

  updateContract(event: any, contract: Contract){
    this.fireservice.updateContract(contract).then(res => {
      this.alertify.success('the contract has been successfully updated');
      console.log(res);
    }).catch(error =>{
      console.log(error)
    });
  }

  deleteContract(event: any, contract: Contract){
    // this.fireservice.deleteContract(contract).then(res => {
    //   console.log(res)
    //   this.alertify.success('contract successfully deleted')
    // }).catch(error =>{
    //   console.log(error)
    // })
  }

  limitContractTitle(title: string, limit = 40) {
    const newTitle: string[] = [];
    // check if the length of the title is greater than limit before we editl
    if (title.length > limit) {
      // get the individual words in the title (#split()) then formulate (#reduce()) a new title lesser than the specified limit
      title.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
        return acc + cur.length; // update the accumulator for the next iteration
      }, 0);

      // return the result
      return `${newTitle.join(' ')}...`;
    }
    return title;
  }

  searchTerm(event){
    this.term = event.target.value;
    // this.search.search(event.target.value)
  }

}
