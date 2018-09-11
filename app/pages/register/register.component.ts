import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColocationService } from '../../_lib/colocation.service';
import { Company } from '../../_models/Company.model';

@Component({
  selector: 'app-register-cmp',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
  test: Date = new Date();

  private sub: any;
  id: number;

  constructor(private route: ActivatedRoute, public _auxiliar: ColocationService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getCompany();
    });
  }

  getCompany() {
    let company: Company = new Company(this.id);
    this._auxiliar.getCompany(company).subscribe(result => {

    })
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }
}
