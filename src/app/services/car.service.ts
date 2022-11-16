import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from "./global";
import { Car } from "../models/car";

@Injectable()
export class CarService{

    public url: string;

    constructor(

        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    /**
     * Metodo que utilizaremos para guardar un coche en la BBDD
     * @param token Token del usuario identificado
     * @param car Objeto CAR que vamos a guardar
     */
    create(token : any, car: Car): Observable<any>{
        let json = JSON.stringify(car);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);

        //Hacemos la peticion AJAX, para que guarde el coche
        return this._http.post(this.url + 'cars', params, {headers: headers});
    }

    /**
     * Metodo el cual nos sacara los datos de todos los coches guardados en la BBDD
     */
    getCars(): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'cars',{headers: headers});
    }

    /**
     * Metodo el cual nos sacara los datos de un coche en concreto, con su id
     * @param id 
     * @returns 
     */
    getCar(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'cars/' + id,{headers: headers});
    }

    /**
     * Metodo que nos actualiza un coche, recibiendo el TOKEN del usuario, el Objeto Car
     * y el ID del coche a actualizar
     * @param token 
     * @param car 
     * @param id 
     */
    update(token: any, car: Car, id: any): Observable<any>{
        let json = JSON.stringify(car);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);

        //Hacemos la peticion AJAX, para que actualize el coche
        return this._http.put(this.url + 'cars/' +id, params, {headers: headers});
    }

    /**
     * Metodo que nos elimina el coche, el cual coincida con el ID que le pasamos
     * @param token 
     * @param id 
     */
    delete(token: any, id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                        .set('Authorization', token);

        //Hacemos la peticion AJAX, para que actualize el coche
        return this._http.delete(this.url + 'cars/' +id, {headers: headers});
    }

}