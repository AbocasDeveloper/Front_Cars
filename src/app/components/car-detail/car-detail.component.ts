import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Car } from "src/app/models/car";
import { User } from "src/app/models/user";
import { CarService } from "src/app/services/car.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  providers: [CarService, UserService]
})
export class CarDetailComponent implements OnInit {

    public car: Car;

    public identity: string;
    public user_id : any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _carService: CarService
    ) {
        this.identity = this._userService.getIdentity();
        this.car = new Car(1, '', 0, '', '0', '', null, null);
    }

  ngOnInit(): void {
    this.getCar();
  }

  getCar(){
    this._route.params.subscribe(params =>{
        let id = +params['id'];

        this._carService.getCar(id).subscribe(
            response => {
                if(response.status == 'success'){
                    this.car = response.car;
                }else{
                    this._router.navigate(['home']);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    });
  }

}
