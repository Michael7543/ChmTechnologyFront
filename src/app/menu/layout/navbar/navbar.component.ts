import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() sideNavToggle = new EventEmitter<boolean>();
  menuState: boolean = false;
  constructor() { }
  SideNavToggle() {
    this.menuState = !this.menuState;
    this.sideNavToggle.emit(this.menuState);
  }

}
