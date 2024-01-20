import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutingModule } from './main/components/components-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ComponentsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
