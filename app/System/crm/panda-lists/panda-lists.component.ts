import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColocationService } from '../../../_lib/colocation.service';
import { NumberModel } from '../../../_models/Number.model';

@Component({
  selector: 'app-panda-lists',
  templateUrl: './panda-lists.component.html',
  styleUrls: ['./panda-lists.component.scss']
})
export class PandaListsComponent implements OnInit {

  myNumber: NumberModel;
  mumujas: NumberModel[] = [];
  goodNumbers: NumberModel[] = [];
  totalMumujas: number = 0;

  constructor(public _auxiliar: ColocationService) {
    this.myNumber = new NumberModel(0, 0, 0, 0, 1, 1);
  }

  ngOnInit() {
  }

  getMinRangeNumber() {
    this.totalMumujas = 0;
    this._auxiliar.getMinRangeNumber(this.myNumber).subscribe(data => {
      this.myNumber = data;
      this._auxiliar.getMumujas(data).subscribe(data => {
        this.mumujas = data;
        this._auxiliar.getGoodNumbers(this.myNumber).subscribe(data => {
          this.goodNumbers = data;
          this.getTotalMumujas();
        });
      });
    });
  }

  getTotalMumujas() {
    this.mumujas.forEach(element => {
      this.totalMumujas += element.lempiras;
    });
  }

}
