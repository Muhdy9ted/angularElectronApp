import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Contract } from 'src/app/_shared/models/contracts.model';
import { FirestoreDbService } from 'src/app/_shared/services/firestore-db.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { timer, of, Observable } from "rxjs";


const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
  
})
export class ContractDetailsComponent implements OnInit { 

  startTimerButton = false;
  othersSection = true;
  manual = false;
  date = new FormControl(moment());
  today = new Date(); 
  addManualForm: FormGroup
  time: any;
  timerDisplay: any;
  stopWatch = timer(0, 1000);
  currentCount: any;
  tiredAf;
  isLoading: boolean = false;

  @ViewChild('timerCounter') timerCounter: ElementRef
  contract: any;
  hr: any = 0;
  min: any = 0;
  sec: any = 0;
  stoptime = true;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private router: Router, private readonly location: Location, private alertify: AlertifyService,  private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.firestore.collection('contracts').doc(`${this.route.snapshot.params.contractId}`).valueChanges().subscribe(
      response => {
        // console.log(response)
        this.contract = response;
        this.isLoading = false;
      }
    )

    setTimeout(()=>{
      if(!this.contract){
        this.isLoading = true
      }
    }, 1000)

    if(this.contract){
      this.isLoading = false;
    }

    // this.actRouter.data.subscribe((data) => {
    //   this.contract = data.contract;
    //   console.log(this.contract)
    // })
    
    this.addManualForm = new FormGroup({
      date: new FormControl(this.date, [Validators.required]),
      time1: new FormControl('', [Validators.required]),
      time2: new FormControl('', [Validators.required]),
      memo: new FormControl('', [Validators.required])
    })
  }

  onSubmitAddMaualForm(){
    console.log(this.addManualForm)
    if(this.addManualForm.valid){
      let{date, time1, time2 ,memo } = this.addManualForm.value
      date = moment(date).format('MMM Do YYYY')
      // console.log(date, time1,time2);
      let time1Test = time1.split(' ')
      let time1Test2 = time1.split(':');
      let time1Final;
      if(time1Test[1] === 'PM'){
        time1Final = parseInt(time1Test2[0]) + 12;
      }else{
        time1Final = parseInt(time1Test2[0])
      }
      // console.log(time1Final);
      let time2Test = time2.split(' ')
      let time2Test2 = time2.split(':');
      let time2Final;
      if(time2Test[1] === 'PM'){
        time2Final = parseInt(time2Test2[0]) + 12;
      }else{
        time2Final = parseInt(time2Test2[0])
      }
      // console.log(time2Final);
      
      // time2 = moment(time2)
      // console.log(time1, time2)
      if(time1Final > time2Final){
        this.alertify.error('enter a valid time range')
      }else{
        let data = {date, time1, time2, memo}
        // console.log(data)
        this.alertify.success('Memo saved successfully')
        this.addManualForm.reset()
      }
    }else{
      this.alertify.error('please enter correct details')
    }
  }

  manualLabour(){
    this.manual = true;
    this.othersSection = false;
  }

  cancelManual(){
    this.manual = false;
    this.othersSection = true
  }

  goBack() {
    this.location.back()
    // this.router.navigate(['/contract-list']).then(()=>{
    //   window.location.reload();
    // });  
  }


  startTimer() {
    this.startTimerButton = true;
    this.time = 0
    this.tiredAf = this.stopWatch.subscribe(ec => {
      this.time++;
      this.timerDisplay = this.getDisplayTimer(this.time);
    });
  }

  stopTimer(){
    this.startTimerButton = false;
    this.tiredAf.unsubscribe()
    let numb = of(this.stopWatch);
    // console.log(numb)
    // console.log(this.timerDisplay)
  }

  getDisplayTimer(time: number) {
    const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time % 3600 / 60);
    const seconds = '' + Math.floor(time % 3600 % 60);

    // console.log(hours, minutes, seconds)
    if(this.startTimerButton){
      this.timerCounter.nativeElement.innerHTML = `${hours}hrs ${minutes}m ${seconds}sec`
      this.currentCount = `${hours}hrs ${minutes}m ${seconds}sec`
    }else{
      this.timerCounter.nativeElement.innerHTML = `00hrs 00m 00sec`
    }


    return {
      hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
      minutes: { digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1) },
      seconds: { digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1) },
    };
  }
}
