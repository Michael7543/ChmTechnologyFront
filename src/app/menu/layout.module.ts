import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent
   
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent
 
  ]
})
export class LayoutModule { }
