import { Component, OnInit } from '@angular/core';
import { Contract } from '../../_shared/models/contracts.model';
import { debounce } from 'lodash';


@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit {

  contracts: Contract[] = [
    {
      contractName: 'Food project',
      clientName: "Mark Zukerberg",
      hours: "14:00 hrs",
      limit: "2:00 hrs"
    },
    {
      contractName: 'Tesla Project',
      clientName: "Elon Musk",
      hours: "15:00 hrs",
      limit: "no limit"
    },
    {
      contractName: 'Microsoft Git projects',
      clientName: "Bill gates",
      hours: "18:00 hrs",
      limit: "4:00 hrs"
    },
    {
      contractName: 'Microsoft Feed the world',
      clientName: "Bill gates",
      hours: "11:00 hrs",
      limit: "3:00 hrs"
    },
    {
      contractName: 'Clock project',
      clientName: "Dan gold",
      hours: "09:00 hrs",
      limit: "1:00 hrs"
    },
  ]

  term: string = "";

  // private search = new JSearch('contractName')
  constructor() {
    this.searchTerm = debounce(this.searchTerm.bind(this), 500)
  }

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

  searchTerm(event){
    this.term = event.target.value;
    // this.search.search(event.target.value)
  }

}
