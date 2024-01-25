import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { LayoutModule } from 'src/app/menu/layout.module';


@NgModule({
  declarations: [
    PerfilUsuarioComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    PrimengModule,
    LayoutModule
  ]
})
export class PerfilUsuarioModule { }
