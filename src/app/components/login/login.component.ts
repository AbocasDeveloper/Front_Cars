import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit
{
    public title: string;
    public user: User;
    public token: any;
    public identity: any;
    public status: string;
    public loading: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'INICIAR SESIÓN';
        this.user = new User(1, 'ROLE_USER', '', '', '', '');
        this.status = '';
    }

    /**
     * Metodo que se ejecuta nada mas cargar el componente
     */
    ngOnInit(): void {
        
        console.log('Login componente cargado');
        this.logout();
    }

    /**
     * Metodo que se ejecuta cuando mandamos los datos del formulario
     * Nos logueara al usuario si se han introducido los datos
     * correctamente
     */
     onSubmit(){

        this.loading = true;

        //Llamamos al metodo de registro a traves del servicio
        this._userService.sigup(this.user).subscribe(
            response => {
                if(response.status != 'error')
                {
                    this.status = 'success';
                    //Si no da error, conseguimos el TOKEN del cliente
                    this.token = response;
                    //Guardamos el TOKEN en el localStorage, para poder acceder completamente a el
                    localStorage.setItem('token', this.token);
                    
                    //Conseguir los datos del usuario identificado
                    this._userService.sigup(this.user, true).subscribe(
                        response => {
                            //Si no da error, conseguimos los datos del cliente
                            this.identity = response;
                            //Guardamos los datos del usuario en el localStorage, para poder acceder completamente a el
                            localStorage.setItem('identity', JSON.stringify(this.identity));

                            //Redireccionamos al usuario
                            this._router.navigate(['home']);
                            
                        },
                        error => {
                            console.log(<any>error);
                        }
                    );
                }
                else
                {
                    this.loading = false;
                    this.status = 'error';
                    this._router.navigate(['login']);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
    
    /**
     * Metodo para cerrar sesion en la aplicacion
     * Nos eliminara del localStorage el TOKEN y los datos del USER
     */
    logout(){
        this._route.params.subscribe(params =>{
            let logout = +params['sure'];

            if(logout == 1){
                localStorage.removeItem('identity');
                localStorage.removeItem('token');

                this._userService.identity = null;
                this._userService.token = null;
                this.identity = null;
                this.token = null;

                //Redirigimos
                this._router.navigate(['home']);
            }
        });
    }

}//END LOGIN COMPONENT