import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaNosotrosRoutingModule } from './pagina-nosotros-routing.module';
import { PaginaNosotrosComponent } from './pagina-nosotros.component';


@NgModule({
  declarations: [
    PaginaNosotrosComponent
  ],
  imports: [
    CommonModule,
    PaginaNosotrosRoutingModule
  ]
})
export class PaginaNosotrosModule { }
