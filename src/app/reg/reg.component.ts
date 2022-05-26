import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  public hide: boolean = false;
  public button_push: boolean = false;
  constructor(public server: ServerService) { }
  login: string = '';
  password: string = '';
  vServer = this.server;
  hide_task: boolean = false;

  ngOnInit(): void {
    document.getElementById("log")?.focus();
  }

  need_reg() {
    this.hide = true;
    this.server.hide_reg = false;
  }
  regAdmin() {
    this.server.regAdmin();//===testing===
  }
  success_reg() {
    this.server.startConnect(this.login, this.password);//===testing===
    this.server.connect();

    // console.log(this.button_push);
    this.button_push = !this.button_push
    setTimeout(() => {
      this.button_push = !this.button_push;
    }, 200);
    setTimeout(hide_reg => {
      // console.log(this.hide);
      // console.log(this.button_push);
      if (this.server.statConnect) {
        this.hide = !this.hide;
      } else {

      }

    }, 1000);

    // this.vServer.testing_reg = false;
    // setTimeout(this.hide_reg, 1000); //ПОЧЕМУ, ВОТ ПОЧЕМУ ЭТО НЕ РАБОТАЛО
    console.log("регистрация");
  }
  // hide_reg(){
  //   console.log(this.hide); //ПОЧЕМУ ЭТА СРАНЬ UNDERFINED
  //   console.log(this.button_push); //ДА ДА И ЭТА ТВАРИНА ТОЖЕ UNDERFINED

  //   this.hide = !this.hide;
  //   this.button_push=!this.button_push;

  // }
}


