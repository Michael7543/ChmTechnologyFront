import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaNosotrosRoutingModule } from './pagina-nosotros-routing.module';
import { PaginaNosotrosComponent } from './pagina-nosotros.component';
import { LayoutModule } from 'src/app/menu/layout.module';


@NgModule({
  declarations: [
    PaginaNosotrosComponent
  ],
  imports: [
    CommonModule,
    PaginaNosotrosRoutingModule,
    LayoutModule
  ]
})
export class PaginaNosotrosModule { }
