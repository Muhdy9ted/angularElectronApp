import { Component, OnInit } from '@angular/core';
import { Contract } from '../../_shared/models/contracts.model'

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit {

  contracts: Contract[] = [
    {
      contractName: 'The name of the Contract Long',
      clientName: "Client's Name",
      hours: "15:00 hrs",
      limit: "2:00 hrs"
    },
    {
      contractName: 'The name of the Contract Long',
      clientName: "Client's Name",
      hours: "15:00 hrs",
      limit: "no limit"
    },
    {
      contractName: 'The name of the Contract Long is much longer than we expected',
      clientName: "Client's Name",
      hours: "15:00 hrs",
      limit: "2:00 hrs"
    },
    {
      contractName: 'The name of the Contract Long is much longer than we expected',
      clientName: "Client's Name",
      hours: "15:00 hrs",
      limit: "2:00 hrs"
    }
  ]
  constructor() { }

  ngOnInit(): void {
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

}
