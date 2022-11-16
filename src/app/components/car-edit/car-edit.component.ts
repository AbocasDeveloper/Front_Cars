import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Car } from "src/app/models/car";
import { User } from "src/app/models/user";
import { CarService } from "src/app/services/car.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html',
  providers: [CarService, UserService]
})
export class CarEditComponent implements OnInit {

    public car: Car;

    public page_title: string;
    public loading: any;
    public statusCar: any;
    public messageError: any;
    public token: any;
    public identity: any;
    public user_id: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _carService: CarService
    ) {
        this.page_title = 'EDITAR COCHE';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.car = new Car(1, '', 0, '', '0', '', null, null);
    }

  ngOnInit(): void {

    //Si no hay usuario identificado, lo redirigimos al LOGIN
    if(this.token == null){
        this._router.navigate(['/login']);
    }

    this._route.params.subscribe(params =>{
        let id = +params['id'];
        this.getCar(id);
    });
  }

  getCar(id: any){

    this._carService.getCar(id).subscribe(
        response => {
            if(response.status == 'success'){
                this.car = response.car;
                this.page_title = 'EDITAR ' + this.car.title; 

                //Comprobamos si el coche que va a editar es del usuario, si no lo es lo redirigimos
                if(this.car.user_id != this.identity['sub']){
                    this._router.navigate(['/inicio']);
                }
                
            }else{
                this._router.navigate(['home']);
            }
        },
        error => {
            console.log(<any>error);
        }
    );
  }

  onSubmit(carEdit: any){
    this.loading = true;

    //Llamamos al servicio
    this._carService.update(this.token, this.car, this.car.id).subscribe(
        response => {
            if(response.status == 'success'){
                this.statusCar = 'success';
                this.car = response.car;
                this._router.navigate(['/coche', this.car.id]);
            }
            else{
                this.statusCar = 'error';
                this.loading = false;
            }
        },
        error => {
            console.log(<any>error);
            this.statusCar = 'error';
            this.loading = false;
            //Recorremos el objeto, para sacar el mensaje de error al usuario
            for (let i in error) {
                if (error[i].hasOwnProperty('title')) {
                    this.messageError = error[i].title[0];
                }
            }
        }
    );
  }

}
