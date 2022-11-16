import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from '../../models/user';
import { UserService } from "src/app/services/user.service";
import { Form } from "@angular/forms";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit
{
    public title: string;
    public user: User;
    public status: string;
    public loading: any;
    public messageError: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'REGISTRO';
        this.user = new User(1, 'ROLE_USER', '', '', '', '');
        this.status = '';
    }

    /**
     * Metodo que se ejecuta nada mas cargar el componente
     */
    ngOnInit(): void {
        
        console.log('Registro componente cargado');
    }

    /**
     * Metodo que se ejecuta cuando mandamos los datos del formulario
     * Nos registrará al usuario si se han introducido los datos
     * correctamente
     */
    onSubmit(form: any){

        this.loading = true;

        //Llamamos al metodo de registro a traves del servicio
        this._userService.register(this.user).subscribe(
            response => {
                if(response.status == 'success')
                {
                    this.status = response.status;
                    this.loading = false;

                    //Vaciamos el formulario
                    this.user = new User(1, 'ROLE_USER', '', '', '', '');
                    form.reset();
                }
                else
                {
                    this.loading = false;
                    this.status = 'error';

                    this.messageError = response.message
                }
            },
            error => {
                this.loading = false;
                console.log(<any>error);
            }
        );
    }
}