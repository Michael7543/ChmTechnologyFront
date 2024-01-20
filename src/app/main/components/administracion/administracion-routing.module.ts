import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsuarioComponent } from "./usuario/usuario.component";
import { ProductosComponent } from "./productos/productos.component";
import { ServiciosComponent } from "./servicios/servicios.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { CarritoComponent } from "./carrito/carrito.component";


const routes : Routes = [
    //{path:'',component:ColocarsuComponent}
    {path:'usuario',component:UsuarioComponent},
    {path:'productos',component:ProductosComponent},
    {path:'servicios',component:ServiciosComponent},
    {path:'categorias',component:CategoriaComponent},
    {path:'carrito',component:CarritoComponent},

  ]
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ]
  })
  export class ComponentsAdministracionRoutingModule { }