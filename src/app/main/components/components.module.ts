import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/menu/layout.module';
import { PrimengModule } from '../../primeng/primeng.module';
import { AdministracionModule } from './administracion/administracion.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { CarritousuarioModule } from './carrito-usuario/carritousuario.module';
import { PaginainicioModule } from './pagina-inicio/paginainicio.module';
import { PaginaproductoModule } from './pagina-productos/paginaproducto.module';
import { PaginaservicioModule } from './pagina-servicios/paginaservicio.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule, 
    PrimengModule,
    LayoutModule,
    AdministracionModule,
    AuthModule,
    PaginainicioModule,
    PaginaproductoModule,
    PaginaservicioModule,
    CarritousuarioModule
    
  ],
  declarations: [
    DashboardComponent

  ],
  
})
export class ComponentsModule {}
