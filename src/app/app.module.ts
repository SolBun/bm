import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { RegComponent } from './reg/reg.component';
import { ServerService } from './server.service'

import { DragulaModule } from 'ng2-dragula';
import { AutosizeDirective } from 'angular-autosize';
import { AutosizeModule } from 'ngx-autosize';


// import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RegComponent,
    // AutosizeDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    DragulaModule.forRoot(),
    AutosizeModule,
    
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
