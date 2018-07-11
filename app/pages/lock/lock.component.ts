import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    ngOnInit() {
        localStorage.setItem('currentUser', JSON.stringify({
            username: '',
            password: '',
            kind: -1,
            id_company: -1,
            company_name: '',
            photoString_company: '',
            telephoneNumber: '',
            name_user: '',
            conectado: -1
        }));
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('lock-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('lock-page');
        body.classList.remove('off-canvas-sidebar');

    }
}
