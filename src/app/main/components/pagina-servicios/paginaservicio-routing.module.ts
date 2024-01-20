import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaServiciosComponent } from './pagina-servicios.component';

const routes: Routes = [
  {
    path:'',
    component:PaginaServiciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaservicioRoutingModule { }
