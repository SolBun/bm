import { Component, OnInit, AfterViewChecked, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragulaService } from 'ng2-dragula';
import { ServerService } from '../server.service';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import html2canvas from 'html2canvas';
// import { PinchZoomModule } from 'ngx-pinch-zoom';
import { AutosizeModule } from 'ngx-autosize';
import { findIndex } from 'rxjs/operators';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewChecked {
  user_name: string = 'user';
  current_block: number = 0;

  select_first: any;
  select_second: any;

  current_id: number = 0;//для нахождения любого элемента по id
  test: boolean = true;
  begin_date: any;
  end_date: any;
  // testing
  test_compare: boolean = true;

  id_group_for_server:number=null;

  boardServer = this.server;
  fragmentsBoards = this.boardServer.fragmentsBoards;//все фрагменты (слепки) 
  currentFragmentBoards: any = []; //текущее состояние доски
  currentFragmentIndex: number = 0; //индекс текущего состояния 
  // arrayFragments: any =[]; 
  ex_board: any = [];
  cards_of_key_partners: any[] = []; //0
  cards_of_key_actions: any[] = [];//1
  cards_of_key_resources: any[] = [];//2
  cards_of_value_proposition: any[] = [];//3
  cards_of_customer_relationships: any[] = [];//4
  cards_of_channels: any[] = [];//5
  cards_of_customer_segments: any[] = [];//6
  cards_of_cost_structure: any[] = [];//7
  cards_of_income_streams: any[] = [];//8

  ngOnInit() {
    this.currentFragmentBoards = this.fragmentsBoards.data[0].values;

    this.cards_of_key_partners = this.currentFragmentBoards[0]; //0
    this.cards_of_key_actions = this.currentFragmentBoards[1];//1
    this.cards_of_key_resources = this.currentFragmentBoards[2];//2
    this.cards_of_value_proposition = this.currentFragmentBoards[3];//3
    this.cards_of_customer_relationships = this.currentFragmentBoards[4];//4
    this.cards_of_channels = this.currentFragmentBoards[5];//5
    this.cards_of_customer_segments = this.currentFragmentBoards[6];//6
    this.cards_of_cost_structure = this.currentFragmentBoards[7];//7
    this.cards_of_income_streams = this.currentFragmentBoards[8];//8
  }
  give_test() {
    this.boardServer.giveMeCard();
  }
  ngAfterViewChecked() {

    // setTimeout(() => {
    //   this.currentFragmentBoards=this.fragmentsBoards[0].values;

    //   this.cards_of_key_partners = this.currentFragmentBoards[0]; //0
    //   this.cards_of_key_actions = this.currentFragmentBoards[1];//1
    //   this.cards_of_key_resources = this.currentFragmentBoards[2];//2
    //   this.cards_of_value_proposition = this.currentFragmentBoards[3];//3
    //   this.cards_of_customer_relationships = this.currentFragmentBoards[4];//4
    //   this.cards_of_channels = this.currentFragmentBoards[5];//5
    //   this.cards_of_customer_segments = this.currentFragmentBoards[6];//6
    //   this.cards_of_cost_structure = this.currentFragmentBoards[7];//7
    //   this.cards_of_income_streams = this.currentFragmentBoards[8];//8
    // //   this.cards_of_key_partners = this.fragmentsBoards[0].values[0]; //0
    // //   this.cards_of_key_actions = this.fragmentsBoards[0].values[1];//1
    // //   this.cards_of_key_resources = this.fragmentsBoards[0].values[2];//2
    // //   this.cards_of_value_proposition = this.fragmentsBoards[0].values[3];//3
    // //   this.cards_of_customer_relationships = this.fragmentsBoards[0].values[4];//4
    // //   this.cards_of_channels = this.fragmentsBoards[0].values[5];//5
    // //   this.cards_of_customer_segments = this.fragmentsBoards[0].values[6];//6
    // //   this.cards_of_cost_structure = this.fragmentsBoards[0].values[7];//7
    // //   this.cards_of_income_streams = this.fragmentsBoards[0].values[8];//8
    // //   console.log("Что-то поменялось!!!!!!!!!!!!!!!!!!!!!!!!!");
    // //   console.log(this.cards_of_key_partners);
    // }, 10);

  }

  constructor(private dragulaService: DragulaService, public server: ServerService) {
    // use these if you want lorem5 

    // this.ex_board[0] = [
    //   {
    //     id_group: "0qwuet",
    //     group_name: "Производство",
    //     show_text: true,
    //     group_cards: [
    //       {
    //         id_group: "1qwuet",
    //         group_name: "Мясное хозяйство",
    //         show_text: true,
    //         group_cards: [

    //           { id_card: "3fdg", name: 'Себастьян', text: ' gr_20', date: Date.now(), show_text: true },
    //           {
    //             id_group: "2qwuet",
    //             group_name: "Шашлычное хозяйство",
    //             show_text: true,
    //             group_cards: [
    //               { id_card: "0fdg", name: 'Себастьян', text: ' gr_20', date: Date.now(), show_text: true },
    //               { id_card: "1fdg", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
    //               { id_card: "2fdg", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
    //             ]
    //           },
    //           { id_card: "4fdg", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
    //           { id_card: "5fdg", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
    //         ]
    //       },


    //       { id_card: "6fdg", name: 'Себастьян', text: 'Lorem ipsum dolor sit amet consectetur.', date: Date.now(), show_text: true },
    //       { id_card: "7fdg", name: 'Алина', text: 'Lorem ipsum dolor sit amet consectetur.', date: Date.parse('12-12-2021'), show_text: true },
    //       { id_card: "8fdg", name: 'Милена', text: 'Lorem ipsum dolor sit.', date: Date.parse('11-04-2021'), show_text: true },
    //       { id_card: "9fdg", name: 'Ирина', text: 'Lorem ipsum.', date: Date.parse('06-17-2021'), show_text: true },
    //     ]
    //   }
    // ];

    // this.cards_of_key_partners = this.ex_board[0];
    // console.log(this.cards_of_key_partners);
    // this.ex_board[1] = [
    //   {
    //     group_cards: [
    //       { id_card: "10fdg", name: 'Себастьянчик', text: ' уравновешивает невероятный интеграл по ориентированной области, таким образом сбылась', date: Date.now(), show_text: true },
    //       { id_card: "11fdg", name: 'Алинчик', text: 'Ортогональный определитель уравновешивает невероятный интеграл по ориентированной области, таким образом сбылась мечта идиота - утверждение полностью доказано. ', date: Date.parse('12-12-2021'), show_text: true },
    //       { id_card: "12fdg", name: 'Миленчик', text: 'Конфликт методологически дискредитирует типичный знак. Гегельянство нетривиально. По своим философским взглядам Дезами был материалистом и атеистом, последователем Гельвеция, однако знак неоднозначен.', date: Date.parse('11-04-2021'), show_text: true },
    //       { id_card: "14fdg", name: 'Иринчик', text: 'Дивергенция векторного поля, общеизвестно, изоморфна. Число е расточительно создает тройной интеграл. Интеграл по ориентированной области расточительно накладывает контрпример.', date: Date.parse('06-17-2021'), show_text: true },
    //     ],
    //   }
    // ];

    // this.cards_of_key_actions = this.ex_board[1];

    // this.createFragment();//ухаха
    // this.dragulaService.createGroup
    this.dragulaService.createGroup('id_block_0', {
      // ...
      invalid: (el, handle) => el.classList.contains('donotdrag')
    });
    
    this.dragulaService.dropModel('id_block_0').subscribe((args) => {
      console.log(args);
    });
  }
  save_title(id_group: any, idx_block: any) {
    switch (idx_block) {
      case 0:
        save_title_text(this.cards_of_key_partners, id_group);
        break;
      case 1:
        save_title_text(this.cards_of_key_actions, id_group);
        break;
      case 2:
        save_title_text(this.cards_of_key_resources, id_group);
        break;
      case 3:
        save_title_text(this.cards_of_value_proposition, id_group);
        break;
      case 4:
        save_title_text(this.cards_of_customer_relationships, id_group);
        break;
      case 5:
        save_title_text(this.cards_of_channels, id_group);
        break;
      case 6:
        save_title_text(this.cards_of_customer_segments, id_group);
        break;
      case 7:
        save_title_text(this.cards_of_cost_structure, id_group);
        break;
      case 8:
        save_title_text(this.cards_of_income_streams, id_group);
        break;
      default:
        break;

    }
  }
  change_title(id_group: any, idx_block: any) {
    switch (idx_block) {
      case 0:
        change_title_text(this.cards_of_key_partners, id_group);
        break;
      case 1:
        change_title_text(this.cards_of_key_actions, id_group);
        break;
      case 2:
        change_title_text(this.cards_of_key_resources, id_group);
        break;
      case 3:
        change_title_text(this.cards_of_value_proposition, id_group);
        break;
      case 4:
        change_title_text(this.cards_of_customer_relationships, id_group);
        break;
      case 5:
        change_title_text(this.cards_of_channels, id_group);
        break;
      case 6:
        change_title_text(this.cards_of_customer_segments, id_group);
        break;
      case 7:
        change_title_text(this.cards_of_cost_structure, id_group);
        break;
      case 8:
        change_title_text(this.cards_of_income_streams, id_group);
        break;

      default:
        break;
    }
  }
  save_text(group_cards, id_block) {
    for (let item of group_cards) {
      if ('group_cards' in item) {
        this.save_text(item.group_cards, id_block);
      } else {
        if (item.id_card == id_block) {
          item.show_text = true;
          item.date = Date.now();
          console.log("SEND boardServer --- --- --- ----" );
          this.boardServer.addCard(0,this.current_block,item.in_group,item);
        }
      }
    }
  }
  save_card(id_block: any, idx_block: any) {
    this.current_block=idx_block;
    switch (idx_block) {
      case 0:
        this.save_text(this.cards_of_key_partners, id_block);
        break;
      case 1:
        this.save_text(this.cards_of_key_actions, id_block);
        break;
      case 2:
        this.save_text(this.cards_of_key_resources, id_block);
        break;
      case 3:
        this.save_text(this.cards_of_value_proposition, id_block);
        break;
      case 4:
        this.save_text(this.cards_of_customer_relationships, id_block);
        break;
      case 5:
        this.save_text(this.cards_of_channels, id_block);
        break;
      case 6:
        this.save_text(this.cards_of_customer_segments, id_block);
        break;
      case 7:
        this.save_text(this.cards_of_cost_structure, id_block);
        break;
      case 8:
        this.save_text(this.cards_of_income_streams, id_block);
        break;
      default:
        break;

    }
    // addCard(fragment_id, block_id, group_id, list_cards)
    
  }

  export_PNG() {
    this.test = false;
    let screenshotTarget = document.getElementById('content');
    html2canvas(screenshotTarget, {
      // onrendered: function(canvas){
      //   document.body.appendChild(canvas);
      // }
      backgroundColor: "opacity"


      // });

    }).then(function (canvas) {

      console.log(canvas);
      let link = document.createElement('a');
      document.body.appendChild(link);
      link.download = 'html_image.png';
      link.href = canvas.toDataURL('image/png');
      // window.open(link.href);
      link.target = '_blank';
      link.click();

      // Типо я тебе кинул два скрина и, где он наполовину, там он чистенький, без этой ГРЯЗИ... 
      // let base64image = canvas.toDataURL("image/png");
      // let deadInside = document.createElement('a');
      // deadInside.setAttribute("href", base64image);
      // deadInside.setAttribute("download", "Fragment.png");
      // deadInside.click();
      // deadInside.remove();


    });
  this.test = true;
  }


  delete_card(id_block: any, idx_block: any) {
    switch (idx_block) {
      case 0:
        delete_text(this.cards_of_key_partners, id_block);
        break;
      case 1:
        delete_text(this.cards_of_key_actions, id_block);
        break;
      case 2:
        delete_text(this.cards_of_key_resources, id_block);
        break;
      case 3:
        delete_text(this.cards_of_value_proposition, id_block);
        break;
      case 4:
        delete_text(this.cards_of_customer_relationships, id_block);
        break;
      case 5:
        delete_text(this.cards_of_channels, id_block);
        break;
      case 6:
        delete_text(this.cards_of_customer_segments, id_block);
        break;
      case 7:
        delete_text(this.cards_of_cost_structure, id_block);
        break;
      case 8:
        delete_text(this.cards_of_income_streams, id_block);
        break;
      default:
        break;

    }
  }

  found_and_push(id_block: any, idx_block: any) {
    switch (idx_block) {
      case 0:
        change_text(this.cards_of_key_partners, id_block);
        break;
      case 1:
        change_text(this.cards_of_key_actions, id_block);
        break;
      case 2:
        change_text(this.cards_of_key_resources, id_block);
        break;
      case 3:
        change_text(this.cards_of_value_proposition, id_block);
        break;
      case 4:
        change_text(this.cards_of_customer_relationships, id_block);
        break;
      case 5:
        change_text(this.cards_of_channels, id_block);
        break;
      case 6:
        change_text(this.cards_of_customer_segments, id_block);
        break;
      case 7:
        change_text(this.cards_of_cost_structure, id_block);
        break;
      case 8:
        change_text(this.cards_of_income_streams, id_block);
        break;


      default:
        break;
    }

  }

  setCurrentID(event: any, id_block: any) {
    this.current_id = event;
    this.current_block = id_block;
    console.log('setID', event, id_block);
  }
  testing(e: any) {
    console.log('eny', e);
  }
  compareCardsInBlocks() {
    this.test_compare = !this.test_compare;
  }
  testingASS() {
    console.log([this.begin_date, this.end_date]);
    // this.test = !this.test;
    console.log([Date.parse(this.begin_date), Date.parse(this.end_date)]);

  }
  setCurrentBlock(index: number) {
    this.current_block = index;
    this.current_id = null;
    console.log('block #', index);
  }
  setCurrentFragment(index: number) {
    this.currentFragmentBoards = this.fragmentsBoards[index].values;
    this.currentFragmentIndex = index;
    this.cards_of_key_partners = this.currentFragmentBoards[0];
    this.cards_of_key_actions = this.currentFragmentBoards[1];
    this.cards_of_key_resources = this.currentFragmentBoards[2];
    this.cards_of_value_proposition = this.currentFragmentBoards[3];
    this.cards_of_customer_relationships = this.currentFragmentBoards[4];
    this.cards_of_channels = this.currentFragmentBoards[5];
    this.cards_of_customer_segments = this.currentFragmentBoards[6];
    this.cards_of_cost_structure = this.currentFragmentBoards[7];
    this.cards_of_income_streams = this.currentFragmentBoards[8];

  }
  createNewBoard() {

    this.fragmentsBoards.push({
      values: [//стоп, а так вообще можно? всм? ладно тестим))      
        this.cards_of_key_partners = [],
        this.cards_of_key_actions = [],
        this.cards_of_key_resources = [],
        this.cards_of_value_proposition = [],
        this.cards_of_customer_relationships = [],
        this.cards_of_channels = [],
        this.cards_of_customer_segments = [],
        this.cards_of_cost_structure = [],
        this.cards_of_income_streams = [],
      ],
      date: Date.now(),
    });
    // console.log();
  }

  add_group(list: any, id_group: any, name_group: any[]) {
    for (let item of list) {
      if ('id_group' in item) {
        if (item.id_group == id_group) {
          //добавление группы
          let temp_item = item;
          for (let name of name_group) {
            temp_item.group_cards.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item.group_cards[temp_item.group_cards.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        } else {
          this.add_group(item.group_cards, id_group, name_group);
        }
      }
    }
  }

  addGroup(name_group: any[]) {

    console.log('block#', this.current_block, 'id_elem#', this.current_id);
    switch (this.current_block) {
      case 0:
        if (this.current_id != null) {
          this.add_group(this.cards_of_key_partners, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_key_partners;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }

        break;
      case 1:
        if (this.current_id != null) {
          this.add_group(this.cards_of_key_actions, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_key_actions;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      case 2:
        if (this.current_id != null) {
          this.add_group(this.cards_of_key_resources, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_key_resources;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      case 3:
        if (this.current_id != null) {
          this.add_group(this.cards_of_value_proposition, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_value_proposition;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      case 4:
        if (this.current_id != null) {
          this.add_group(this.cards_of_customer_relationships, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_customer_relationships;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      case 5:
        if (this.current_id != null) {
          this.add_group(this.cards_of_channels, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_channels;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      case 6:
        if (this.current_id != null) {
          this.add_group(this.cards_of_customer_segments, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_customer_segments;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      case 7:
        if (this.current_id != null) {
          this.add_group(this.cards_of_cost_structure, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_cost_structure;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      case 8:
        if (this.current_id != null) {
          this.add_group(this.cards_of_income_streams, this.current_id, name_group);
        } else {
          let temp_item = this.cards_of_income_streams;
          for (let name of name_group) {
            temp_item.push({
              id_group: this.boardServer.counter_id_group.toString() + "_gr_" + this.boardServer.login,
              group_name: name,
              show_text: name == 'Новая группа' ? false : true,
              group_cards: [],
            });
            temp_item = temp_item[temp_item.length - 1].group_cards;
            this.boardServer.counter_id_group++;
          }
        }
        break;
      default:
        break;
    }

  }


  deleteAllGroups() {
    switch (this.current_block) {
      case 0:
        this.cards_of_key_partners = [];
        break;
      case 1:
        this.cards_of_key_actions = [];
        break;
      case 2:
        this.cards_of_key_resources = [];
        break;
      case 3:
        this.cards_of_value_proposition = [];
        break;
      case 4:
        this.cards_of_customer_relationships = [];
        break;
      case 5:
        this.cards_of_channels = [];
        break;
      case 6:
        this.cards_of_customer_segments = [];
        break;
      case 7:
        this.cards_of_cost_structure = [];
        break;
      case 8:
        this.cards_of_income_streams = [];
        break;
      default:
        break;
    }

  }

  clearCardsInGroup() {
    switch (this.current_block) {

      case 0:
        delete_cards_in_groups(this.cards_of_key_partners, this.current_id);
        break;
      case 1:
        delete_cards_in_groups(this.cards_of_key_actions, this.current_id);
        break;
      case 2:
        delete_cards_in_groups(this.cards_of_key_resources, this.current_id);
        break;
      case 3:
        delete_cards_in_groups(this.cards_of_value_proposition, this.current_id);
        break;
      case 4:
        delete_cards_in_groups(this.cards_of_customer_relationships, this.current_id);
        break;
      case 5:
        delete_cards_in_groups(this.cards_of_channels, this.current_id);
        break;
      case 6:
        delete_cards_in_groups(this.cards_of_customer_segments, this.current_id);
        break;
      case 7:
        delete_cards_in_groups(this.cards_of_cost_structure, this.current_id);
        break;
      case 8:
        delete_cards_in_groups(this.cards_of_income_streams, this.current_id);
        break;
      default:
        break;
    }
  }
  deleteGroup() {
    switch (this.current_block) {

      case 0:
        delete_group(this.cards_of_key_partners, this.current_id);
        break;
      case 1:
        delete_group(this.cards_of_key_actions, this.current_id);
        break;
      case 2:
        delete_group(this.cards_of_key_resources, this.current_id);
        break;
      case 3:
        delete_group(this.cards_of_value_proposition, this.current_id);
        break;
      case 4:
        delete_group(this.cards_of_customer_relationships, this.current_id);
        break;
      case 5:
        delete_group(this.cards_of_channels, this.current_id);
        break;
      case 6:
        delete_group(this.cards_of_customer_segments, this.current_id);
        break;
      case 7:
        delete_group(this.cards_of_cost_structure, this.current_id);
        break;
      case 8:
        delete_group(this.cards_of_income_streams, this.current_id);
        break;
      default:
        break;




    }

  }
  createBoard() {
    this.fragmentsBoards.push({
      values: [
        this.cards_of_key_actions,
        this.cards_of_key_resources,
        this.cards_of_value_proposition,
        this.cards_of_customer_relationships,
        this.cards_of_channels,
        this.cards_of_customer_segments,
        this.cards_of_cost_structure,
        this.cards_of_income_streams,
      ],
      date: Date.now(),
    });
    console.log(this.fragmentsBoards.length);
  }

  returnLastCard(el: any) {
    return el[el.lenght - 1];
    // console.log(lastBoard);
  }

  returnLastBoard() {
    // return this.fragmentsBoards[this.fragmentsBoards.lenght - 1];
  }
  createFragment() {

    this.fragmentsBoards[0] = {
      values: [
        [
          {
            id_group: "0qwuet",
            group_name: "Производство",
            group_cards: [
              {
                id_group: "1qwuet",
                group_name: "Мясное хозяйство",
                group_cards: [

                  { id_card: "3fdg", name: 'Себастьян', text: ' gr_20', date: Date.now(), show_text: true },
                  {
                    id_group: "2qwuet",
                    group_name: "Шашлычное хозяйство",
                    group_cards: [
                      { id_card: "0fdg", name: 'Себастьян', text: ' gr_20', date: Date.now(), show_text: true },
                      { id_card: "1fdg", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
                      { id_card: "2fdg", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
                    ]
                  },
                  { id_card: "4fdg", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
                  { id_card: "5fdg", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
                ]
              },


              { id_card: "6fdg", name: 'Себастьян', text: 'Lorem ipsum dolor sit amet consectetur.', date: Date.now(), show_text: true },
              { id_card: "7fdg", name: 'Алина', text: 'Lorem ipsum dolor sit amet consectetur.', date: Date.parse('12-12-2021'), show_text: true },
              { id_card: "8fdg", name: 'Милена', text: 'Lorem ipsum dolor sit.', date: Date.parse('11-04-2021'), show_text: true },
              { id_card: "9fdg", name: 'Ирина', text: 'Lorem ipsum.', date: Date.parse('06-17-2021'), show_text: true },
            ]
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],

      date: Date.now(),
    };
    this.fragmentsBoards.push({
      values: [
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
        [
          { name: 'Себастьян', text: ' Второй фрагмент 1 ', date: Date.now(), show_text: true },
          { name: 'Алина', text: 'Второй фрагмент 1', date: Date.parse('12-12-2021'), show_text: true },
          { name: 'Милена', text: ' Второй фрагмент 1', date: Date.parse('11-04-2021'), show_text: true },
          { name: 'Ирина', text: 'Второй фрагмент 1', date: Date.parse('06-17-2021'), show_text: true },
        ],
      ],
      date: Date.now(),
    });
    console.log('boards', this.fragmentsBoards);
  }
  //  WHY?   Играем в игру, угадаю, что нужно написать ybxtuj) ладно на меня фокус поставь!!!

  // ................................................................................
  //
  // search_card(group_cards: any, id_block: any) {
  //   for (let item of group_cards) {
  //     if ('group_cards' in item) {
  //       this.search_card(item.group_cards, id_block);
  //     } else {
  //       if (item.id_card == id_block) {
  //         item.show_text = false;
  //       }
  //     }
  //   }
  // }

  compareBoard() {

    //Что ты творишь? Экспериментирую" А почему 4? Первый 1.1.2001-2.3.2002 1.1.2014-12.12.2022 ? промежуток потом второй
    // А почему у нас только 2 даты, а не 4???  две потому есть начальная, и конечная даты, а насчет 4ех непонятно
    //Пум пум пумпупмппумпумупупумпмупумпу пум муп...

    let testing_data_1 = [
      {
        id_group: "2qwuet",
        group_name: "Шашлычное хозяйство",
        show_text: true,
        group_cards:
          [
            { id_card: "0fdg", name: 'Себастьян', text: ' gr_20', date: Date.now(), show_text: true },
            { id_card: "1fdg", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
            { id_card: "2fdg", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
          ]
      },
      { id_card: "4fdg", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
      { id_card: "5fdg", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
    ];

    let testing_data_2 = [
      {
        id_group: "2qwuet",
        group_name: "НЕ Шашлычное хозяйство",
        show_text: true,
        group_cards:
          [
            { id_card: "0fdg", name: 'Себастьян', text: ' НЕ gr_20', date: Date.now(), show_text: true },
            { id_card: "1fdg", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
            { id_card: "2fdg", name: 'Себастьян', text: ' НЕ gr_22', date: Date.now(), show_text: true },
          ]
      },
      { id_card: "4fdg", name: 'Себастьян', text: ' НЕ gr_21', date: Date.now(), show_text: true },
      { id_card: "5fdg", name: 'Себастьян', text: ' НЕ gr_22', date: Date.now(), show_text: true },
    ];

    let firstComparedBoard = testing_data_1;
    // let firstComparedBoard = this.fragmentsBoards[this.select_first].values;
    // let secondComparedBoard = this.fragmentsBoards[this.select_second].values;
    let secondComparedBoard = testing_data_2;


    let sameCards = [];//Одинаковые карточ
    let oldDeletedCards = []; // Красные карточки, старые
    let newCards = [];// Зеленые карточки, новые 
    let allCardsOfFirstBoard = [];
    let allCardsOfSecondBoard = [];
    let rekMas = [];

    // for (let second_item of secondComparedBoard) {
    // }

    // for (let first_item of firstComparedBoard) {
    //   if('id_card' in first_item){
    //     allCardsOfFirstBoard.push({first_item});
    //   }
    //   if('group_cards' in first_item){

    //   }



    // }
    getCardsFromBoards(firstComparedBoard, allCardsOfFirstBoard);
    getCardsFromBoards(secondComparedBoard, allCardsOfSecondBoard);
    // console.log('Все первые карточки' ,allCardsOfFirstBoard,'Все вторые карточки',allCardsOfSecondBoard);
    compare_cards(allCardsOfFirstBoard, allCardsOfSecondBoard, rekMas);
    console.log(rekMas);

    // for (let second_item of secondComparedBoard) {
    //   // if(first_item.text == second_item.text){
    //   //   sameCards.push({first_item});
    //   //   break;
    //   // }
    //   // if('group_cards' in first_item){

    //   // }



    // }

  }



  //-----------------------------------------------------------------------------------------
  // second_item.id_group 
  // first_item.group_cards

  //                       second_item.id_group
  //                       second_item.group_cards
  //                                               second_item.id_group
  //                                               second_item.group_cards
  //-----------------------------------------------------------------------------------------
  //second_item.group_cards

  //                       second_item.id_group
  //                       second_item.group_cards
  //                                                second_item.id_group
  //                                               second_item.group_cards
  //                                               

  // (old_id[],item.group_cards[])
  //         new_id
  //         old_id.push(new_id)
  //           (old_id[],item.group_cards[])
  //
  //         second_item.id_group
  //         second_item.group_cards
  //                         card_id, text, name .... -----> id_group[uir,werew,werw,wer] card_id, text, name gr:true yel:false red:false
  //                         card_id, text, name .... -----> id_group [uir,werew,werw] card_id, text, name gr:false yel:true red:false
  //                         card_id, text, name .... -----> id_group card_id, text, name 
  //                         card_id, text, name .... -----> id_group card_id, text, name 
  //                         card_id, text, name .... -----> id_group card_id, text, name 
  //                         card_id, text, name .... -----> id_group card_id, text, name 
  //                         card_id, text, name ....
  //                         card_id, text, name ....
  //                         second_item.id_group
  //                         second_item.group_cards
  //                                         card_id, text, name .... -----> id_group card_id, text, name 
  //                                         card_id, text, name .... -----> id_group card_id, text, name 
  //                                         card_id, text, name .... -----> id_group card_id, text, name 
  //                                         card_id, text, name .... -----> id_group card_id, text, name 
  //                                         card_id, text, name .... -----> id_group card_id, text, name 
  //                                         second_item.id_group
  //                                         second_item.group_cards
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                         card_id, text, name ....
  //                         card_id, text, name ....
  //                         second_item.id_group
  //                         second_item.group_cards
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                         card_id, text, name ....
  //                         card_id, text, name ....
  //                         card_id, text, name ....
  //                         second_item.id_group
  //                         second_item.group_cards
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....
  //                                         card_id, text, name ....



  // if (first_item.id_card == second_item.id_card && first_item.text == second_item.text) {
  //   sameCards.push({ id: first_item.id_card, text: first_item.text });
  // }




  // let firstComparedBoard = this.fragmentsBoards[index_first].values; // Доска с раней датой
  // let secondComparedBoard = this.fragmentsBoards[index_second].values; // Доска с поздней датой
  // let redArray: any = [];
  // let yellowArray: any = [];
  // let greenArray: any = [];
  // if (firstComparedBoard.values.date > secondComparedBoard.values.date) {
  //   for (let elem1 of firstComparedBoard) {
  //     if (elem1.values.user_name === secondComparedBoard.values.user_name &&
  //       elem1.values.date === secondComparedBoard.values.date &&
  //       elem1.values.text === secondComparedBoard.values.text
  //     ) {
  //       redArray = secondComparedBoard.values;
  //     }
  //     if (elem1.values.user_name != secondComparedBoard.values.user_name &&
  //       elem1.values.user_name != secondComparedBoard.values.user_name &&
  //       elem1.values.user_name != secondComparedBoard.values.user_name
  //     ) {
  //       greenArray = secondComparedBoard.values;
  //     }
  //     else {
  //       yellowArray = secondComparedBoard.values;
  //     }
  //   }
  // }
  // if (firstComparedBoard.values.date < secondComparedBoard.values.date) {
  //   for (let elem1 of secondComparedBoard) {
  //     if (elem1.values.user_name === firstComparedBoard.values.user_name &&
  //       elem1.values.date === firstComparedBoard.values.date &&
  //       elem1.values.text === firstComparedBoard.values.text
  //     ) {
  //       redArray = firstComparedBoard.values;
  //     }
  //     if (elem1.values.user_name != firstComparedBoard.values.user_name &&
  //       elem1.values.user_name != firstComparedBoard.values.user_name &&
  //       elem1.values.user_name != firstComparedBoard.values.user_name
  //     ) {
  //       greenArray = firstComparedBoard.values;
  //     }
  //     else {
  //       yellowArray = firstComparedBoard.values;
  //     }
  //   }
  // }


  // сделай функцию которая берет фрагменты таблицы всей, доски? ага
  // for (let el of this.fragmentsBoards) {
  //   if ((Date.parse(el.date)> Date.parse(begin_date1) && Date.parse(el.date)< Date.parse(end_date1)) ||
  //    (Date.parse(el.date)> Date.parse(begin_date2) && Date.parse(el.date)< Date.parse(end_date2))) { 
  //     firstComparedBoard = this.fragmentsBoards;
  //   }
  // }

  //   for(let i =0; i<firstComparedBoard.lenght; i++){
  //     let temp: any;
  //     for(let j = 1; j < firstComparedBoard.length-1;j++){
  //       if(Date.parse(firstComparedBoard[i].date) < Date.parse(firstComparedBoard[j].date) ){
  //         temp = firstComparedBoard[i];
  //         firstComparedBoard[i] = firstComparedBoard[j];
  //         firstComparedBoard[j] = temp;
  //       }
  //     }
  //   }

  //   return firstComparedBoard;






  // if (date1 > date2) {
  //   for (let i of this.boards.lenght) {
  //     if ((date2 = this.boards[i].date)) {
  //       firstComparedBoard[i] = this.boards[i];
  //     }
  //     if ((date1 = this.boards[i].date)) {
  //       secondComparedBoard[i] = this.boards[i];
  //     }
  //   }
  // } else {
  //   for (let i of this.boards.lenght) {
  //     if ((date1 = this.boards[i].date)) {
  //       firstComparedBoard[i] = this.boards[i];
  //     }
  //     if ((date2 = this.boards[i].date)) {
  //       secondComparedBoard[i] = this.boards[i];
  //     }
  //   }
  // }



  changeText(index: number, id_block: number) {
    switch (id_block) {
      case 0:
        this.cards_of_key_partners[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_key_partners[this.cards_of_key_partners.length - 1].date.toString()
          );
        }, 100);
        break;
      case 1:
        this.cards_of_key_actions[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_key_actions[this.cards_of_key_actions.length - 1].date.toString()
          );
        }, 100);
        break;
      case 2:
        this.cards_of_key_resources[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_key_resources[this.cards_of_key_resources.length - 1].date.toString()
          );
        }, 100);
        break;
      case 3:
        this.cards_of_value_proposition[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_value_proposition[
              this.cards_of_value_proposition.length - 1
            ].date.toString()
          );
        }, 100);
        break;
      case 4:
        this.cards_of_customer_relationships[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_customer_relationships[this.cards_of_customer_relationships.length - 1].date.toString());
        }, 100);
        break;
      case 5:
        this.cards_of_channels[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_channels[this.cards_of_channels.length - 1].date.toString()
          );
        }, 100);
        break;
      case 6:
        this.cards_of_customer_segments[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_customer_segments[
              this.cards_of_customer_segments.length - 1
            ].date.toString()
          );
        }, 100);
        break;
      case 7:
        this.cards_of_cost_structure[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_cost_structure[
              this.cards_of_cost_structure.length - 1
            ].date.toString()
          );
        }, 100);
        break;
      case 8:
        this.cards_of_income_streams[index].show_text = false;
        setTimeout(() => {
          this.focusMethod(
            this.cards_of_income_streams[
              this.cards_of_income_streams.length - 1
            ].date.toString()
          );
        }, 100);
        break;
      default:
        console.log(index, id_block);
        break;
    }
  }
  onCtrlEnter(index: number, id_block: number) {
    switch (id_block) {
      case 0:
        if (this.cards_of_key_partners[index].text.trim().length > 0) {
          this.cards_of_key_partners[index].show_text = true;
          this.cards_of_key_partners[index].date = Date.now();
        } else {
          this.cards_of_key_partners.splice(index, 1);
        }
        break;
      case 1:
        this.cards_of_key_actions[index].show_text = true;
        this.cards_of_key_actions[index].date = Date.now();
        break;
      case 2:
        this.cards_of_key_resources[index].show_text = true;
        this.cards_of_key_resources[index].date = Date.now();
        break;
      case 3:
        this.cards_of_value_proposition[index].show_text = true;
        this.cards_of_value_proposition[index].date = Date.now();
        break;
      case 4:
        this.cards_of_customer_relationships[index].show_text = true;
        this.cards_of_customer_relationships[index].date = Date.now();
        break;
      case 5:
        this.cards_of_channels[index].show_text = true;
        this.cards_of_channels[index].date = Date.now();
        break;
      case 6:
        this.cards_of_customer_segments[index].show_text = true;
        this.cards_of_customer_segments[index].date = Date.now();
        break;
      case 7:
        this.cards_of_cost_structure[index].show_text = true;
        this.cards_of_cost_structure[index].date = Date.now();
        break;
      case 8:
        this.cards_of_income_streams[index].show_text = true;
        this.cards_of_income_streams[index].date = Date.now();
        break;
      default:
        console.log(index, id_block);
        break;
    }
  }

  deleteBlock() {
    //Удаление карточек из блока
    switch (this.current_block) {
      case 0:
        // this.cards_of_key_partners.splice(0, this.cards_of_key_partners.length);
        this.cards_of_key_partners = [];
        break;
      case 1:
        this.cards_of_key_actions = [];
        break;
      case 2:
        this.cards_of_key_resources = [];
        break;
      case 3:
        this.cards_of_value_proposition = [];
        break;
      case 4:
        this.cards_of_customer_relationships = [];
        break;
      case 5:
        this.cards_of_channels = [];
        break;
      case 6:
        this.cards_of_customer_segments = [];
        break;
      case 7:
        this.cards_of_cost_structure = [];
        break;
      case 8:
        this.cards_of_income_streams = [];
        break;
      default:
        console.log("ERROR NOT FOUND INDEX OF CURRENT BLOCK #", this.current_block);
        break;
    }
  }

  deleteCard(index: number, type: number) {
    //Удаление одной карточки
    switch (type) {
      case 0:
        this.cards_of_key_partners.splice(index, 1);
        break;
      case 1:
        this.cards_of_key_actions.splice(index, 1);
        break;
      case 2:
        this.cards_of_key_resources.splice(index, 1);
        break;
      case 3:
        this.cards_of_value_proposition.splice(index, 1);
        break;
      case 4:
        this.cards_of_customer_relationships.splice(index, 1);
        break;
      case 5:
        this.cards_of_channels.splice(index, 1);
        break;
      case 6:
        this.cards_of_customer_segments.splice(index, 1);
        break;
      case 7:
        this.cards_of_cost_structure.splice(index, 1);
        break;
      case 8:
        this.cards_of_income_streams.splice(index, 1);
        break;
      default:
        console.log(index, type);
        break;
    }
  }

  focusMethod = async function getFocus(id: string) {
    document.getElementById(id)?.focus();
  };
  add_card(group_cards: any, id_block: any, user_name: string, counter: number, login: string) {
    for (let item of group_cards) {
      if ('group_cards' in item) {
        if (item.id_group == id_block) {
          item.group_cards.push({
            id_card: counter.toString() + login,
            in_group:id_block,
            name: user_name,
            text: '',
            date: Date.now(),
            show_text: false,
          });
          this.id_group_for_server=id_block;///сохраняем id группы для добавления карточки на сервер /это всё дичь

          setTimeout(() => {
            this.focusMethod(
              item.group_cards[item.group_cards.length - 1].id_card
            );
          }, 100);
        } else {
          this.add_card(item.group_cards, id_block, user_name, counter, login);
        }
      }
    }
  }
  // ---------------------------------------просмотреть-------------------------------------------
  addCard(index_block?: number) {
    if (index_block == undefined) {
      index_block = this.current_block;
    }
    switch (index_block) {
      case 0:
        if (this.current_id != null) {
          this.add_card(this.cards_of_key_partners, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_key_partners.length > 0) {
            this.cards_of_key_partners[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              in_group:null,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_key_partners[0].group_cards[this.cards_of_key_partners[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          } else {
            this.cards_of_key_partners.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_key_partners[0].group_cards[this.cards_of_key_partners[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;
        break;
      case 1:
        if (this.current_id != null) {
          this.add_card(this.cards_of_key_actions, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_key_actions.length > 0) {
            this.cards_of_key_actions[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_key_actions[0].group_cards[this.cards_of_key_actions[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_key_actions.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_key_actions[0].group_cards[this.cards_of_key_actions[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;
        break;
      case 2:
        if (this.current_id != null) {
          this.add_card(this.cards_of_key_resources, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_key_resources.length > 0) {
            this.cards_of_key_resources[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_key_resources[0].group_cards[this.cards_of_key_resources[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_key_resources.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_key_resources[0].group_cards[this.cards_of_key_resources[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;
        break;

      case 3:
        if (this.current_id != null) {
          this.add_card(this.cards_of_value_proposition, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_value_proposition.length > 0) {
            this.cards_of_value_proposition[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_value_proposition[0].group_cards[this.cards_of_value_proposition[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_value_proposition.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_value_proposition[0].group_cards[this.cards_of_value_proposition[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;
        break;

      case 4:
        if (this.current_id != null) {
          this.add_card(this.cards_of_customer_relationships, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_customer_relationships.length > 0) {
            this.cards_of_customer_relationships[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_customer_relationships[0].group_cards[this.cards_of_customer_relationships[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_customer_relationships.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_customer_relationships[0].group_cards[this.cards_of_customer_relationships[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;
        break;
      case 5:
        if (this.current_id != null) {
          this.add_card(this.cards_of_channels, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_channels.length > 0) {
            this.cards_of_channels[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_channels[0].group_cards[this.cards_of_channels[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_channels.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_channels[0].group_cards[this.cards_of_channels[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;

        break;
      case 6:
        if (this.current_id != null) {
          this.add_card(this.cards_of_customer_segments, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_customer_segments.length > 0) {
            this.cards_of_customer_segments[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_customer_segments[0].group_cards[this.cards_of_customer_segments[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_customer_segments.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_customer_segments[0].group_cards[this.cards_of_customer_segments[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;

        break;
      case 7:
        if (this.current_id != null) {
          this.add_card(this.cards_of_cost_structure, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_cost_structure.length > 0) {
            this.cards_of_cost_structure[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_cost_structure[0].group_cards[this.cards_of_cost_structure[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_cost_structure.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_cost_structure[0].group_cards[this.cards_of_cost_structure[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;

        break;
      case 8:
        if (this.current_id != null) {
          this.add_card(this.cards_of_income_streams, this.current_id, this.boardServer.user_name, this.boardServer.counter_id_cards, this.boardServer.login);
        } else {
          if (this.cards_of_income_streams.length > 0) {
            this.cards_of_income_streams[0].group_cards.push({
              id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
              name: this.boardServer.user_name,
              text: '',
              date: Date.now(),
              show_text: false,
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_income_streams[0].group_cards[this.cards_of_income_streams[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);

          } else {
            this.cards_of_income_streams.push({
              group_cards: [
                {
                  id_card: this.boardServer.counter_id_cards.toString() + this.boardServer.login,
                  name: this.boardServer.user_name,
                  text: '',
                  date: Date.now(),
                  show_text: false,
                }
              ]
            });
            setTimeout(() => {
              this.focusMethod(
                this.cards_of_income_streams[0].group_cards[this.cards_of_income_streams[0].group_cards.length - 1].id_card.toString()
              );
            }, 100);
          }
        }
        this.boardServer.counter_id_cards++;

        break;

      default:
        console.log("ERROR NOT FOUND INDEX OF BLOCK #", index_block);

        break;
    }
  }
}
type card = {
  id_card?: string;
  name: string;
  text: string;
  date: number;
  show_text: boolean;
};


function change_title_text(group_cards, id_group) {
  console.log("Я здеся!!!", group_cards, id_group);
  for (let item of group_cards) {
    if ('id_group' in item) {
      if (item.id_group == id_group) {
        console.log("Да-да-а-да!!!", group_cards, id_group);
        item.show_text = false;
      } else {
        change_title_text(item.group_cards, id_group);
      }
    } else if ('group_cards' in item) {
      change_title_text(item.group_cards, id_group);
    }
  }
}
function save_title_text(group_cards, id_group) {
  console.log("Я здеся!!!", group_cards, id_group);
  for (let item of group_cards) {
    if ('id_group' in item) {
      if (item.id_group == id_group) {
        console.log("Да-да-а-да!!!", group_cards, id_group);
        item.show_text = true;
      } else {
        save_title_text(item.group_cards, id_group);
      }
    } else if ('group_cards' in item) {
      save_title_text(item.group_cards, id_group);
    }
  }
}

// function save_text(group_cards, id_block) {
//   console.log("NOT SEND boardServer --- --- --- ----" );
//   for (let item of group_cards) {
//     if ('group_cards' in item) {
//       save_text(item.group_cards, id_block);
//     } else {
//       if (item.id_card == id_block) {
//         item.show_text = true;
//         item.date = Date.now();
//       }
//     }
//   }
// }
function delete_text(group_cards: any[], id_block: any) {
  for (let i = 0; i < group_cards.length; i++) {
    if ('group_cards' in group_cards[i]) {
      delete_text(group_cards[i].group_cards, id_block);
    } else {
      if (group_cards[i].id_card == id_block) {
        group_cards.splice(i, 1);
      }
    }
  }
}
function change_text(group_cards: any, id_block: any) {
  for (let item of group_cards) {
    if ('group_cards' in item) {
      change_text(item.group_cards, id_block);
    } else {
      if (item.id_card == id_block) {
        item.show_text = false;
      }
    }
  }
}
function delete_group(list: any[], id_group: any) {
  for (let i = 0; i < list.length; i++) {
    if ('group_cards' in list[i]) {
      if (list[i].id_group == id_group) {
        list.splice(i, 1);
      } else {
        delete_group(list[i].group_cards, id_group);
      }
    }
  }
}



function delete_cards_in_groups(list: any[], id_group: any) {
  console.log('list', list, 'id_group', id_group);
  for (let i = 0; i < list.length; i++) {
    if ('group_cards' in list[i]) {
      if (list[i].id_group == id_group) {
        list[i].group_cards = [];
      } else {
        delete_cards_in_groups(list[i].group_cards, id_group);
      }
    }
  }
}




function getCardsFromBoards(firstComparedBoard, allCardsOfFirstBoard) {
  for (let first_item of firstComparedBoard) {
    if ('id_card' in first_item) {
      allCardsOfFirstBoard.push(first_item);
    }
    if ('group_cards' in first_item) {
      getCardsFromBoards(first_item.group_cards, allCardsOfFirstBoard);
    }
  }
}


// надо исправить, не записывается в oldCards и newCards
// function compare_cards(oldCardList,newCardList,sameCards,oldCards,newCards){
//   let flag1:boolean = false;
//   let elem1;
//   let elem2;
//   let elem;
//   for(elem1 of oldCardList){
//     for(elem2 of newCardList){
//       if(elem1.text == elem2.text){
//         sameCards.push(elem1);
//         break;
//       }
//     }
//   }

//   for (elem1 of oldCardList) {
//     flag1 = false;
//     for (elem of sameCards) {
//       if (elem1.text == elem.text) {
//         flag1 = true;
//         break;
//       }
//     }
//     if (!flag1) {
//       oldCards.push(elem1);
//     }
//   }

//   for (elem2 of newCardList) {
//     flag1 = false;
//     for (elem of sameCards) {
//       if (elem2.text == elem.text) {
//         flag1 = true;
//         break;
//       }
//     }
//     if (!flag1) {
//       newCards.push(elem2);
//     }
//   }
// }

function compare_cards(cFB1, cFB2, rM) {
  for (let item1 of cFB1) {
    for (let item2 of cFB2) {
      if (item1.id_card == item2.id_card) {
        if (item1.text == item2.text) {
          rM.push({
            "id_card": item1.id_card,
            "text_old": item1.text,
            "test_new": item1.text,
            "type": "same",
            // 
          });
          break;
        } else {
          rM.push({
            "id_card": item1.id_card,
            "text_old": item1.text,
            "test_new": item2.text,
            "type": "updated"
          });
          break;
        }
      }
    }
  }

  for (let item1 of cFB1) {
    let flag: boolean = false;
    for (let item of rM) {
      if (item1.id_card == item.id_card) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      rM.push({
        "id_card": item1.id_card,
        "text_old": item1.text,
        "test_new": item1.text,
        "type": "removed"
      });
    }
  }

  for (let item2 of cFB2) {
    let flag: boolean = false;
    for (let item of rM) {
      if (item2.id_card == item.id_card) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      rM.push({
        "id_card": item2.id_card,
        "text_old": item2.text,
        "test_new": item2.text,
        "type": "new"
      });
    }
  }
}















