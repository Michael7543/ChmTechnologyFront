import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoUsuarioComponent } from './carrito-usuario.component';

const routes: Routes = [
  {
    path:'',
    component:CarritoUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarritousuarioRoutingModule { }
