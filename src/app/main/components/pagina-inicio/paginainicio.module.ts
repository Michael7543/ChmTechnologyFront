import { NgModule } from '@angular/core';
import { PaginaInicioComponent } from './pagina-inicio.component';
import { PaginainicioRoutingModule } from './paginainicio-routing.module';
import { LayoutModule } from 'src/app/menu/layout.module';
import { FormsModule } from '@angular/forms';
import { WhatsappComponent } from '../Whatsapp/Whatsapp.component';




@NgModule({
  declarations: [
    PaginaInicioComponent,
    WhatsappComponent
    
  ],
  imports: [
    PaginainicioRoutingModule,
    LayoutModule,
    FormsModule

    
    
  ]
})
export class PaginainicioModule { }
