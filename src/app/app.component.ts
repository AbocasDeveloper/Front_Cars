import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'client-angular';

  public identity: any;
  public token: any;

  constructor(
    private _userService: UserService
  )
  {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
      console.log("app.component cargado correctamente")
  }

  /**
   * Cada vez que se produce un cambio a nivel de componente o interno en la aplicación,
   * ejecuta el codigo que hay en el metodo. 
   * Cada vez que hay un cambio en la app, se va a ejecutar de manera recurrente
   */
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
