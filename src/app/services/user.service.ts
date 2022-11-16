import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService{

    public url: string;
    public identity: any;
    public token: any;

    constructor(

        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    /**
     * Metodo que nos permite registrar el usuario en la aplicacion
     * @param user
     */
    register(user: User): Observable<any>{
        //Convertimos el usuario recibido en un json string, para poder enviarlo por POST
        let json = JSON.stringify(user);
        //Parametros que vamos a enviar
        let params = 'json='+json;

        //Establecemos las cabeceras de la peticion que vamos a hacer
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        //Hacemos la peticion AJAX, para que realize el REGISTRO del usuario, con la api
        return this._http.post(this.url+'register', params, {headers: headers});
    }

    /**
     * Metodo que nos permite loguear al usuario
     */
    sigup(user: any, gettoken = false): Observable<any>{
        if(gettoken != false) user.gettoken = 'true';

        //Convertimos el usuario recibido en un json string, para poder enviarlo por POST
        let json = JSON.stringify(user);
        //Parametros que vamos a enviar
        let params = 'json='+json;

        //Volvemos a poner a false la propiedad, por si se ejecuta el metodo otra vez
        user.gettoken = 'false';

        //Establecemos las cabeceras de la peticion que vamos a hacer
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        //Hacemos la peticion AJAX, para que realize el REGISTRO del usuario, con la api
        return this._http.post(this.url+'login', params, {headers: headers});
    }

    /**
     * Metodo que consulta el localStorage y me consigue los datos del usuario
     */
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity') || '{}');

        if(identity.status == 'error') this.identity = null; //Si no tenemos user
         
        if(identity.sub != null){
            this.identity = identity; //Si tenemos user
        }else{
            this.identity = null; //Salimos de la sesion y no tenemos user
        }

        return this.identity;
    }

    /**
     * Metodo que consulta el localStorage y consigue el TOKEN del usuario
     */
    getToken(){
        let token = localStorage.getItem('token');

        if(token == '[object Object]') this.token = null; //Si no tenemos user
        else this.token = token; //Si tenemos user

        return this.token;
    }
}