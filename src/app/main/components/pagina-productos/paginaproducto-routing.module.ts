import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaProductosComponent } from './pagina-productos.component';

const routes: Routes = [

  {
    path:'',
    component:PaginaProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaproductoRoutingModule { }
