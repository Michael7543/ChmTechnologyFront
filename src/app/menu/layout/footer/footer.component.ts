import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../../app.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anioActual: number = new Date().getFullYear();


    ngOnInit(): void {
       
    }
}


