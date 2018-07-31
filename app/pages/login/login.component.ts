import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ColocationService } from '../../_lib/colocation.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Login } from '../../_models/Login.model';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

    test: Date = new Date();

    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    myLogin: Login = new Login('', '');

    constructor(private element: ElementRef, public _auxiliar: ColocationService, public _router: Router) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ingresar() {
        let conectado: number = 0;

        this._auxiliar.validarLogin(this.myLogin)
            .subscribe(result => {
                conectado = result.conectado;

                if (conectado == 1 && result.kind == 1 || conectado == 1 && localStorage.getItem('Aprobado') == 'SI') {
                    //Guardar en STORAGE
                    sessionStorage.setItem('currentUser', JSON.stringify({
                        username: result.username,
                        password: result.password,
                        kind: result.kind,
                        id_company: result.id_company,
                        company_name: result.company_name,
                        photoString_company: result.photoString_company,
                        photoString: result.photoString,
                        telephoneNumber: result.telephoneNumber,
                        name_user: result.name_user,
                        conectado: result.conectado,
                        membership: result.membership
                    }));
                    // Validacion exitosa
                    localStorage.setItem('Aprobado', 'SI');
                    this._auxiliar.connected = true;
                    this.myLogin = result;
                    this._router.navigateByUrl('/dashboard');
                }
                else {
                    this.showSwal('auto-close', 'ERROR', 'Usuario ó Contraseña Incorrecto');
                }
            }, error => {
                this.showSwal('auto-close', 'ERROR', 'Usuario ó Contraseña Incorrecto');
                console.log("Error al validar", error);
            })

        /*
        */
    }

    showSwal(type, pTitle: string, totalMessage: string) {
        // let totalMessage: string = '';
        if (type === 'basic') {
            swal({
                title: pTitle,
                text: totalMessage,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
            }).catch(swal.noop);
        } else if (type === 'auto-close') {
            swal({
                type: 'error',
                title: pTitle,
                text: totalMessage,
                timer: 2000,
                showConfirmButton: false
            }).then(
                function () { },
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer')
                    }
                }).catch(swal.noop);
        }
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }
}
