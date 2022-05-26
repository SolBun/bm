import { Injectable } from '@angular/core';

@Injectable()
export class ServerService {

  //Это ради теста
  testing_reg: boolean = true;
  //Это ради теста
  current_block: number = 0;
  fragment_model_id: number = 0;
  model_id: number = 0;
  counter_id_group: number = 100;
  counter_id_cards: number = 200;
  fragmentsBoards: any;
  name: string = "reg";
  iAdmin: boolean = true;

  ws: WebSocket;

  login: string = "Filipp";
  user_name: string = "Филипп";
  password: string = "";

  statConnect: boolean = false;







  messages: message[] = [];
  rooms: room[] = [];
  stat_room: statistic[] = [];
  stat_room_sort: statistic[];
  my_rooms: room[] = [];
  current_room: number = -1;
  public new_mes: number = 0;
  public ch_log: boolean = true;
  public ch_pas: boolean = true;

  public ad_log: boolean = true;
  public ad_pas: boolean = true;
  public addUsr: boolean = false;

  public hide_reg: boolean = true;
  public reg_mes: string = '';
  constructor() { }

  target: string[] = [];

  load_data() {
    let loader;
    loader = this.load_file("room_k");
    if (loader != undefined) {
      // this.rooms=loader;
    } else {
      this.rooms = [];
    }
    console.log(this.rooms);
    loader = this.load_file("st_room_k");
    if (loader != undefined) {
      // this.stat_room=loader;
    } else {
      this.stat_room = [];
    }
    console.log(this.stat_room);
    loader = this.load_file("st_room_sort_k");
    if (loader != undefined) {
      // this.stat_room_sort=loader;
    } else {
      this.stat_room_sort = [];
    }
    console.log(this.stat_room_sort);
    loader = this.load_file("my_room_k");
    if (loader != undefined) {
      // this.my_rooms=loader;
    } else {
      this.my_rooms = [];
    }
    console.log(this.my_rooms);
    loader = this.load_file("adm_k");
    if (loader != undefined) {
      // this.iAdmin=loader;
    } else {
      this.iAdmin = false;
    }
    console.log(this.iAdmin);
    loader = this.load_file("active_k");
    if (loader != undefined) {
      // this.statConnect=loader;
    } else {
      this.statConnect = false;
    }
    console.log(this.statConnect);
    loader = this.load_file("log_k");
    if (loader != undefined) {
      this.login = loader;
    } else {
      this.login = ""
    }
    console.log(this.login);
    loader = this.load_file("pas_k");
    if (loader != undefined) {
      this.password = loader;
    } else {
      this.password = "";
    }
    console.log(this.password);
    loader = this.load_file("name_k");
    if (loader != undefined) {
      this.name = loader;
    } else {
      this.name = "reg";
    }
    console.log(this.name);
    loader = this.load_file("targ_k");
    if (loader != undefined) {
      // this.target=loader;
    } else {
      this.target = [];
    }
    console.log(this.target);
  }
  addRoom(room_name: string, clients_list: string[]) {
    this.ws.send(JSON.stringify({ type: "addRoom", admin: this.name, clients: clients_list, name: room_name }));
  }
  remRoom(room_id: number) {
    this.ws.send(JSON.stringify({ type: "remRoom", room_id: room_id }));
  }
  remMyRoom(room_id: number) {
    this.ws.send(JSON.stringify({ type: "remMyRoom", room_id: room_id, client_name: this.name }));
    //   this.rooms[room_id]=undefined;
    //   this.stat_room[room_id]=undefined;
  }
  addCard(fragment_id, block_id, group_id, list_cards) {
    ////--------------------------------------====================================
    console.log("addCard send --- --- ---");
    console.log(JSON.stringify({ type: "addCard", model_id: 0, fragment_id: 0, name:this.login, block_id: block_id, group_id: group_id, cards: list_cards }));
    this.ws.send(JSON.stringify({ type: "addCard", model_id: 0, fragment_id: 0, name:this.login, block_id: block_id, group_id: group_id, cards: list_cards }));
  }
  addGroup(){

  }
  giveMeCard() {

    let item = {
      group_id: 'dksjfh_12312',
      group_name: "Получите",
      show_text: true,
      group_cards: [
        { id_card: "10fdg", name: 'Себастьянчик', text: ' уравновешивает невероятный интеграл по ориентированной области, таким образом сбылась', date: Date.now(), show_text: true },
        { id_card: "11fdg", name: 'Алинчик', text: 'Ортогональный определитель уравновешивает невероятный интеграл по ориентированной области, таким образом сбылась мечта идиота - утверждение полностью доказано. ', date: Date.parse('12-12-2021'), show_text: true },
        { id_card: "12fdg", name: 'Миленчик', text: 'Конфликт методологически дискредитирует типичный знак. Гегельянство нетривиально. По своим философским взглядам Дезами был материалистом и атеистом, последователем Гельвеция, однако знак неоднозначен.', date: Date.parse('11-04-2021'), show_text: true },
        { id_card: "14fdg", name: 'Иринчик', text: 'Дивергенция векторного поля, общеизвестно, изоморфна. Число е расточительно создает тройной интеграл. Интеграл по ориентированной области расточительно накладывает контрпример.', date: Date.parse('06-17-2021'), show_text: true },
      ],
    }
    this.ws.send(JSON.stringify({ type: "addCard", fragment_id: 0, block_id: 1, group_id: null, item: item }));
  }



  startConnect(login: string, password: string) {
    this.ws = new WebSocket('ws://localhost:3030/id' + login);
    this.login = login;
    this.password = password;
    this.ch_log = this.ch_pas = true;
  }



  regAdmin() {
    this.ch_pas = this.ch_log = true;
    // this.button_reg=!this.button_reg;
    this.login = this.login.trim();
    this.password = this.password.trim();
    let pattern = /[А-Яа-яЁё]/;
    if (pattern.test(this.login)) {
      this.ch_log = false;
      this.reg_mes = "используйте буквы латинского алфавита";
      console.log("О нет!");
    } else {
      if (this.login != "") {
        if (this.password != "") {
          this.ws = new WebSocket('ws://localhost:3030/idreg');
          this.ch_pas = this.ch_log = true;
          this.regCheckAdm();
        } else {
          this.ch_pas = false;
        }
      } else {
        this.ch_log = false;
        this.reg_mes = "неверно набран логин";
      }
    }

    // setTimeout(() => {
    //   this.button_reg=!this.button_reg;
    // }, 100);

  }


  regCheckAdm() {
    this.ws.onopen = () => {
      console.log("Законектился на регистрацию Админа👌");
      this.ws.send(JSON.stringify({ type: "regCheckAdm", login: this.login, password: this.password }));
    }
    this.ws.onclose = () => console.log("Отконектился от регистрации👌");

    this.ws.onmessage = answer => {//Получение от server
      let letter = JSON.parse(answer.data);
      console.log("KYKY Админ");
      console.log(letter);
      if (letter.type == "regCheckAdm") {
        console.log('OK');
        this.hide_reg = true;
        this.ws.close();
        this.startConnect(this.login, this.password);
        this.connect();
      }
      if (letter.type == "wrLogin") {
        console.log("Пользователь с таким логином уже существует!!!!!");
        this.ch_log = false;
        this.reg_mes = "набранный логин уже занят";
      }
    }
  }


  addUser(login: string, password: string) {
    //----------------------------защита сделана 11.11.2021
    login = login.trim();
    password = password.trim();
    let pattern = /[А-Яа-яЁё]/;
    if (pattern.test(login)) {
      this.ad_log = false;

      this.reg_mes = "используйте буквы латинского алфавита";
      console.log("О нет!");
    } else {
      if (this.login != "") {
        if (this.password != "") {
          this.ad_pas = this.ad_log = true;
          this.ws.send(JSON.stringify({ type: "addUser", admin: this.name, login: login, password: password }));///====test====
        } else {
          this.ad_pas = false;
        }
      } else {
        this.ad_log = false;
        this.reg_mes = "неверно набран логин";
      }
    }
  }
  renameRoom(room_id: number, new_name: string) {
    this.ws.send(JSON.stringify({ type: "renameRoom", room_id: room_id, room_name: new_name }));///====test====
  }
  changeClients(room_id: number, client_rem: boolean, room_clients: string[]) {
    this.ws.send(JSON.stringify({ type: "changeClients", room_id: room_id, room_stat: client_rem, room_clients: room_clients }));
  }
  send(text: string): void {
    if (this.my_rooms[this.current_room].room_clients.indexOf(this.name) != -1) {
      // this.my_rooms[this.current_room].room_messages.push({name:this.name,text:text,time: Date.now()});
      this.ws.send(JSON.stringify({
        type: 'message', name: this.name,
        room_id: this.my_rooms[this.current_room].room_id,
        room_name: this.my_rooms[this.current_room].room_name,
        room_admin: this.my_rooms[this.current_room].room_admin,
        room_clients: this.my_rooms[this.current_room].room_clients,
        room_messages: { name: this.name, text: text, time: Date.now() }
      }));
      console.log(this.my_rooms[this.current_room]);
      // this.rooms[this.my_rooms[this.current_room].room_id].room_messages.push({name:this.name,text:text,time: Date.now()});
      this.save_file(this.rooms, "room_k");

    }
  }



  public connect() {
    this.ws.onopen = () => {
      console.log("Законектился👌");
      this.ws.send(JSON.stringify({ type: "regCheck", login: this.login, password: this.password }));
    }

    this.ws.onclose = () => console.log("Сервер послал меня, я отконектился👌");

    this.ws.onmessage = answer => {//Получение от server
      let letter = JSON.parse(answer.data);
      console.log("===== Пришло от сервера =====");
      console.log(letter);
      console.log("===== Пришло от сервера =====");
      if (letter.type == 'message') {
        if (this.rooms[letter.room_id] != undefined && this.rooms[letter.room_id] != null) {
          console.log("2");
          this.rooms[letter.room_id].room_messages.push(letter.room_messages);
        } else {
          this.rooms[letter.room_id] = { room_name: letter.room_name, room_id: letter.room_id, room_admin: letter.room_admin, room_clients: letter.room_clients, room_messages: [letter.room_messages] };
          // this.stat_room[letter.room_id]={add:null,rem:null, new:0};
          console.log("1");
          console.log(letter.room_id);
          console.log(this.rooms[letter.room_id]);
        }
        if ((this.current_room != -1 && this.my_rooms[this.current_room].room_id != letter.room_id) || this.current_room == -1) {
          this.stat_room[letter.room_id].new++;
          this.new_mes++;
        }
        this.save_file(this.rooms, "room_k");
        this.save_file(this.stat_room, "st_room_k");
      }
      if (letter.type == "regCheck") {
        console.log("OK_1_");
        console.log(letter);
        this.name = letter.client.login;
        this.iAdmin = letter.client.isAdmin;
        this.user_name = letter.client.name;
        this.counter_id_cards = letter.client.counter_id_cards;
        this.counter_id_group = letter.client.counter_id_group;
        if (this.iAdmin) {
          this.target = letter.client.users;
          console.log(this.name);
          console.log(this.iAdmin);
          console.log(this.target);
          // this.save_file(this.target, "targ_k");
        }
        // this.save_file(this.name, "name_k");
        // this.save_file(this.login, "log_k");
        // this.save_file(this.password, "pas_k");
        // this.save_file(this.iAdmin, "adm_k");
      }
      if (letter.type == "addCard") {
        pushCard(letter.group_id, letter.cards, this.fragmentsBoards.data[letter.fragment_id].values[letter.block_id]);
        console.log("поменял", this.fragmentsBoards.data[letter.fragment_id].values[letter.block_id]);
        // this.fragmentsBoards.data[letter.fragment_id].values[letter.block_id];
        // model_id: 0, fragment_id: fragment_id, block_id: block_id, group_id: group_id, cards: list_cards
        // this.fragmentsBoards[letter.fragment_id].values[letter.block_id].push(letter.item);
        // console.log("Опанапна 😋", this.fragmentsBoards);
        // type: 'addCard', name: 'server',
        //             fragment_id: message['fragment_id'],
        //             block_id: message['block_id'],
        //             group_id: null,
        //             item: message['item']

      }
      if (letter.type == "regCheckAddModels") {
        console.log("OK_2_");
        console.log(letter);
        this.fragmentsBoards = letter.models;

        console.log("Опанапна 😋", this.fragmentsBoards);

        // if (this.rooms[letter.room_id] != undefined && this.rooms[letter.room_id] != null) {
        //   this.rooms[letter.room_id].room_name = letter.rooms.room_name;
        //   this.rooms[letter.room_id].room_id = letter.room_id;
        //   this.rooms[letter.room_id].room_admin = letter.rooms.room_admin;
        //   this.rooms[letter.room_id].room_clients = letter.rooms.room_clients;
        // } else {
        //   this.rooms[letter.room_id] = { room_name: letter.rooms.room_name, room_id: letter.room_id, room_admin: letter.rooms.room_admin, room_clients: letter.rooms.room_clients, room_messages: [] };
        // }
        // this.createStat(letter.rooms.room_clients, letter.room_id);
        // this.save_file(this.rooms, "room_k");
      }
      if (letter.type == "youCan") {
        console.log("OK_3_");
        console.log(letter);
        this.statConnect = true;
        // this.save_file(this.statConnect, "active_k");
        // this.testing_reg = false;
      }
      if (letter.type == "wrLogin") {
        console.log("Не тот логин");
        this.statConnect = false;
        this.ch_log = false;
        // this.testing_reg = true;
      }
      if (letter.type == "wrPassword") {
        console.log("Не тот пароль");
        this.statConnect = false;
        this.ch_pas = false;
        // this.testing_reg = true;
      }
      if (letter.type == "addUser") {
        if (letter.stat) {
          this.stat_room.forEach(stat => {
            stat.add.push(letter.login);
          });
          this.target.push(letter.login);
          this.save_file(this.target, "targ_k");
          this.ad_log = this.ad_pas = true;
          this.addUsr = true;
        } else {
          this.ad_log = false;
          this.addUsr = false;
          this.reg_mes = "набранный логин уже занят";
        }
      }
      if (letter.type == 'remRoom') {
        console.log("=Удалена=Системой= №" + letter.room_id);
        // console.log(this.rooms[letter.room_id]);
        console.log(this.my_rooms);
        console.log(this.rooms);
        if (this.current_room != -1 && this.rooms[letter.room_id].room_id == this.my_rooms[this.current_room].room_id) {
          this.current_room = -1;
        }
        this.my_rooms = [];
        //   this.rooms[letter.room_id]=undefined;
        //   this.stat_room[letter.room_id]=undefined;
        this.save_file(this.rooms, "room_k");
        this.save_file(this.stat_room, "st_room_k");
      }
      if (letter.type == 'createRoom') {
        this.rooms[letter.room_id] = { room_name: letter.room_name, room_id: letter.room_id, room_admin: letter.room_admin, room_clients: letter.room_clients, room_messages: [] };
        console.log("==Старт=Ракеты==");
        console.log(this.rooms[letter.room_id]);
        this.createStat(letter.room_clients, letter.room_id);
        console.log("5");
        console.log(this.stat_room);
        this.save_file(this.rooms, "room_k");
        this.save_file(this.stat_room, "st_room_k");
      }
      if (letter.type == 'renameRoom') {
        this.rooms[letter.room_id].room_name = letter.room_name;
        this.save_file(this.rooms, "room_k");
      }
      if (letter.type == 'changeClients') {
        if (this.rooms[letter.room_id] != undefined || this.rooms[letter.room_id] != null) {
          this.rooms[letter.room_id].room_clients = [letter.room_clients];
          this.save_file(this.rooms, "room_k");
        }
      }
      this.my_rooms = reloadRooms(this.rooms);
      this.stat_room_sort = reloadRooms(this.stat_room);
      this.save_file(this.my_rooms, "my_room_k");
      this.save_file(this.stat_room_sort, "st_room_sort_k");
    }
  }
  public getRoom(index: number) {
    this.my_rooms = reloadRooms(this.rooms);
    return this.my_rooms[index].room_messages;
  }
  createStat(roomClients: string[], id: number) {
    if (this.iAdmin) {
      let add_arr = [... this.target];
      let rem_arr = [];
      for (let i = 0; i < roomClients.length; i++) {
        if (add_arr.indexOf(roomClients[i]) != -1) {
          rem_arr.push(add_arr[add_arr.indexOf(roomClients[i])]);
          add_arr.splice(add_arr.indexOf(roomClients[i]), 1);
        }
      }
      this.stat_room[id] = { add: add_arr, rem: rem_arr, new: 0 };
    } else {
      this.stat_room[id] = { add: null, rem: null, new: 0 };
    }

  }

  save_file(value: any, key: string) {
    let item = JSON.stringify(value);
    localStorage.setItem(key, item);
    sessionStorage.setItem(key, item);
  }
  load_file(key: string) {
    let itemLoc = localStorage.getItem(key);
    let itemSes = sessionStorage.getItem(key);
    if (itemLoc == undefined) {
      if (itemSes == undefined) {
        console.log('1');
        return undefined;
      }
      itemSes = JSON.parse(itemSes);
      console.log('2');
      return itemSes;
    }
    itemLoc = JSON.parse(itemLoc);
    console.log('3');
    console.log(itemLoc);
    return itemLoc;
  }
}
type message = {
  name: string;
  text: string;
  time: number;
}
type room = {
  room_name: string;
  room_clients: string[];
  room_admin: string;
  room_id: string;
  room_messages: message[];
}
type statistic = {
  add: string[];
  rem: string[];
  new: number;
}

function reloadRooms(incomingRooms) {
  let ouputRooms = [...incomingRooms];
  for (let i = 0; i < ouputRooms.length; i++) {
    if (ouputRooms[i] == undefined) {
      ouputRooms.splice(i, 1);
      i--;
    }
  }
  return ouputRooms;
}
function pushCard(group_id, cards, cards_block) {
  // models[model_id].data[fragment_id].values[block_id];
  // Через 3 часа она заработала... УРА! УРА! 

  console.log("================================================================");
  console.log(group_id);
  console.log(cards);
  console.log(cards_block);
  console.log("================================================================");
  for (let item of cards_block) {
      console.log("Нашёл_0");
      if ((item.id_group != null) && (item.id_group != undefined)) {
          console.log("Нашёл_101");
          if (item.id_group == group_id) {
            console.log("Нашёл совпадение по id группы");
            let find = false;
            for (let i=0; i<item.group_cards.length;i++) {
                if ((item.group_cards[i].id_card != undefined) && (item.group_cards[i].id_card == cards.id_card)) {
                    console.log("Заменил карточку)))");
                    item.group_cards[i] = cards;
                    find = true;
                    break;
                }
            }
            if (!find) {
                console.log("Вставил карточку)))");
                item.group_cards.push(cards);
            }
            break;
          } else {
              console.log("Нашёл_1111");
              pushCard(group_id, cards, item.group_cards);
          }
      }
  }
}


