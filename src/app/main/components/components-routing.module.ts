import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CarritoUsuarioComponent } from './carrito-usuario/carrito-usuario.component';
import { PaginaProductosComponent } from './pagina-productos/pagina-productos.component';
import { PaginaServiciosComponent } from './pagina-servicios/pagina-servicios.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio',  component:PaginaInicioComponent, pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pagina-inicio/paginainicio.module').then(m => m.PaginainicioModule),
  },
  {
    path: 'productos',
    loadChildren: () => import('./pagina-productos/paginaproducto.module').then(m => m.PaginaproductoModule),
  },
  {
    path: 'carrito/user',
    loadChildren: () => import('./carrito-usuario/carritousuario.module').then(m => m.CarritousuarioModule),
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pagina-servicios/paginaservicio.module').then(m => m.PaginaservicioModule),
  },
  {
    path: 'perfil/usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioModule),
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pagina-nosotros/pagina-nosotros.module').then(m => m.PaginaNosotrosModule),
  },
  {path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: 'administracion',
        loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule),
         canActivate: [AuthGuard]
      },
    ]
  },
  {
    path:'**',
    component: NotFoundComponent
  } 

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ComponentsRoutingModule { }