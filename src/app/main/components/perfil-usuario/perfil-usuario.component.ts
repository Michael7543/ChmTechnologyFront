import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { UpdateUsuarioDTO, UsuarioModel } from '../../entities/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  FormUsuario: FormGroup;
  mostrarContrasenia: boolean = false;
  passwordPromptLabel = 'Ingrese su contraseña';
  weakLabel = 'Débil';
  mediumLabel = 'Media';
  strongLabel = 'Fuerte';
  usuario: any;
  accessToken!:string;
  listadousuario: UsuarioModel[] = []; //poner
  loading: boolean = true;
  displayModal: boolean = false;
  selectUsuario:UpdateUsuarioDTO={}; //
  constructor(
    private form: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.FormUsuario = this.form.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      username: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, this.validarFormatoCorreo],
      ],
      roleName: ['BASIC', ],
    });
  }

  ngOnInit() {
    this.obtenerDatosUsuario()
  }
 

  editusuario(lista:any){
    this.displayModal = true;
    //console.log('Datos recibidos para editar:', lista);
    this.selectUsuario = lista;
    const roleName = lista.role && lista.role.length > 0 ? lista.role[0].name : '';
    this.FormUsuario.patchValue({
      nombre: lista.nombre,
      apellido: lista.apellido,
      telefono: lista.telefono,
      email: lista.email,
      username: lista.username,
      direccion: lista.direccion,
      role: roleName
    });
    
  }


  validarFormatoCorreo(control: FormControl) {
    if (control.touched) {
      const email = control.value;
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;

      if (!pattern.test(email)) {
        return { formatoCorreoInvalido: true };
      }
    }

    return null;
  }

  updateUsuario(): any { 
    const id = this.selectUsuario.id ?? 0; 
    const data = this.FormUsuario.value;
    //console.log('Datos a enviar para actualizar:', data); // Agregar esta línea
    //data.role.id = parseInt(data.role.id.toString());
    this.usuarioService.updateUsuario(id, data).subscribe((response) => {
      //console.log(response);
     // const usarioUpdate = this.getUser();
     this.obtenerDatosUsuario()
     this.displayModal = false;
      //console.log(usarioUpdate);
      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'El usuario se ha actualizado correctamente.',
      });
      this.FormUsuario.reset();
      this.selectUsuario = {};
    });
  }
  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }

  onInputletras(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no alfabéticos
    const alphabeticValue = value.replace(/[^A-Za-z\s]/g, '');
    input.value = alphabeticValue;
  }

  private extractUserId(accessToken: string): string {
    try {
        const decodedToken: any = jwtDecode(accessToken);

        // Verifica si el campo "sub" existe
        if (decodedToken.sub) {
          console.log(decodedToken.sub)
            return decodedToken.sub;
        } else {
            console.error('El campo "sub" no existe en el token.');
            
            return '';

        }
    } catch (error) {
        console.error('Error al extraer el ID de usuario del token', error);
        return '';
    }
}

obtenerDatosUsuario() {
  // Extrae el ID de usuario del token almacenado en localStorage
  const accessToken = localStorage.getItem('accessToken');
  const userId = accessToken ? this.extractUserId(accessToken) : '';

  if (userId) {
    // Convertir el ID de usuario de string a number
    const userIdNumber = Number(userId);
    
    // Llama al servicio para obtener los datos del usuario por ID
    this.usuarioService.getUsuarioid(userIdNumber).subscribe(
      (data: UsuarioModel) => { // Cambiar el tipo de parámetro a UsuarioModel
        this.listadousuario = [data];
        this.loading = false; // Convertir el objeto en un array
        console.log(data)
       
        // Aquí puedes realizar acciones adicionales con los datos del usuario si es necesario.
      },
      (error) => {
        console.error('Error al obtener datos del usuario', error);
        // Puedes manejar el error de acuerdo a tus necesidades.
      }
    );
  } else {
    console.error('No se pudo obtener el ID de usuario del token.');
    // Puedes manejar la falta de ID de usuario según tus necesidades.
  }
}


  
  
getEventValue(event: any): string {
  return event.target.value;
}

  actualizarUsuario(){

  }
}
