import { NgModule } from '@angular/core';
import { PaginaInicioComponent } from './pagina-inicio.component';
import { PaginainicioRoutingModule } from './paginainicio-routing.module';
import { LayoutModule } from 'src/app/menu/layout.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaginaInicioComponent
  ],
  imports: [
    PaginainicioRoutingModule,
    LayoutModule,
    FormsModule

    
    
  ]
})
export class PaginainicioModule { }
