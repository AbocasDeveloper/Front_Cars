import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  providers: [UserService, CarService],
})
export class CarNewComponent implements OnInit {

    public page_title: string;
    public identity: string;
    public token: string;
    public car: Car;
    public statusCar: any;
    public messageError: any;
    public loading: any;

    public user_id : any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _carService: CarService
    ){
        this.page_title = 'CREAR COCHE';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user_id = this.identity['sub'];
        this.car = new Car(1, '', this.user_id, '', '0', '', null, null);
    }

    ngOnInit(): void 
    {   
        //Si no hay usuario identificado, lo redirigimos al LOGIN
        if(this.token == null){
            this._router.navigate(['/login']);
        }
    }

    /**
     * Metodo que se ejecuta cuando guardamos un coche en el formulario
     * Se comunicara con el servicio. para llevar a cabo la accion de guardar los datos
     * @param form 
     */
    onSubmit(form: any){

        this.loading = true;

        this._carService.create(this.token, this.car).subscribe(
            response =>{
                if(response.status == 'success'){
                    this.car = response.car;
                    this.statusCar = 'success';

                    this._router.navigate(['home']);
                }
                else{
                    this.loading = false;
                    this.statusCar = 'error';
                }
            },
            error =>{
                this.loading = false;
                this.statusCar = 'error';
                //Recorremos el objeto, para sacar el mensaje de error al usuario
                for (let i in error) {
                    if (error[i].hasOwnProperty('title')) {
                        this.messageError = error[i].title[0];
                    }
                }
            }
        )
    }
}
