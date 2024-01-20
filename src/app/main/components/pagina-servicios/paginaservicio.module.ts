import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaservicioRoutingModule } from './paginaservicio-routing.module';
import { PaginaServiciosComponent } from './pagina-servicios.component';
import { LayoutModule } from 'src/app/menu/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng/primeng.module';


@NgModule({
  declarations: [
    PaginaServiciosComponent
  ],
  imports: [
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    PaginaservicioRoutingModule
  ]
})
export class PaginaservicioModule { }
