import { Component } from '@angular/core';
import { ServerService } from './server.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easyModels';
  testing_reg:boolean=true;
  constructor(public server: ServerService) { }
  appServer=this.server;
  // reg(){
  //   this.appServer.testing_reg=!this.testing_reg;
  // }
}
