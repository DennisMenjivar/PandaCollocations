import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    id_company: number = -1;
    constructor(private element: ElementRef) {
        if (JSON.parse(sessionStorage.getItem('currentUser'))) {
            this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
        }
        this.sidebarVisible = false;
    }
    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;

        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
}
