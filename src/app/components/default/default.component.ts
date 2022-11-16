import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from '../../models/user';
import { Car } from "src/app/models/car";
import { UserService } from "src/app/services/user.service";
import { CarService } from "src/app/services/car.service";
import { Form } from "@angular/forms";

@Component({
    selector: 'default',
    templateUrl: './default.component.html',
    providers: [UserService, CarService]
})
export class DefaultComponent implements OnInit
{
    public title: string;
    public cars: Array<Car>;
    public page: number;
    public token: any;
    public identity: any;
    public delete: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _carService: CarService
    ){
        this.title = 'INICIO';
        this.cars = new Array<Car>;
        this.page = 0;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    /**
     * Metodo que se ejecuta nada mas cargar el componente
     */
    ngOnInit(): void {
        this.getCars();
    }

    deleteCar(id: any){

        this._carService.delete(this.token, id).subscribe(
            response => {
                this.delete = true;
                this.getCars();
            },
            error => {
                this.delete = false;
                console.log(<any>error);
            }
        );
    }

    getCars(){
        this._carService.getCars().subscribe(
            response => {
                if(response.status == 'success'){
                    this.cars = response.cars;
                }
            },
            error => {
                console.log(error);
            }
        )
    }

}