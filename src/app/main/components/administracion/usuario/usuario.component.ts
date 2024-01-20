import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RolesModel } from 'src/app/main/entities/Roles';
import { UsuarioModel, UpdateUsuarioDTO } from 'src/app/main/entities/Usuario';
import { ROLES } from 'src/app/main/enums/Roles';
import { UsuarioService } from 'src/app/main/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  UsuarioForm: FormGroup;
  listadousuario: UsuarioModel[] = []; //poner
  selectUsuario:UpdateUsuarioDTO={}; //
  listadoroles: RolesModel[]=[];
  mostrarContrasenia: boolean = false;
  loading: boolean = true;
  roles = Object.values(ROLES);

  constructor(private usuarioService: UsuarioService, private form: FormBuilder) {
    {
      this.UsuarioForm = this.form.group({
        
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        password: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, this.validarFormatoCorreo]],
        username: ['', Validators.required],
       // role: ['', ],
        
      })
    }


  }

    ngOnInit(): void {
      this.getUser();
      this.getRoles();  
     
    }
    async getUser() {
      try {
        const data = await firstValueFrom(this.usuarioService.getUsuario());
        this.listadousuario = data;
        this.loading = false;
        console.log('Usuarios:', this.listadousuario);
      } catch (error) {
        console.error('Error al obtener Usuarios:', error);
      }
    }



    async getRoles() {
      try {
        const data = await firstValueFrom(this.usuarioService.getRoles());
        this.listadoroles = data;
        this.loading = false;
        console.log('Roles:', this.listadoroles);
      } catch (error) {
        console.error('Error al obtener Roles:', error);
      }
    }

    editusuario(lista:any){
      console.log('Datos recibidos para editar:', lista);
      this.selectUsuario = lista;
      
      this.UsuarioForm.patchValue({
        nombre: lista.nombre,
        apellido: lista.apellido,
        telefono: lista.telefono,
        password: lista.password,
        email: lista.email,
        username: lista.username,
        direccion: lista.direccion,
        role: lista.role
        

      });
      
    }


    
    agregarUsuario() {
      let usuario: UsuarioModel = this.UsuarioForm.value;
    
      console.log('Datos del formulario:', usuario);
      this.usuarioService.crearUsuario(usuario).subscribe(
        (response: any) => {
          // Muestra el token en la consola para depuración
          Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado',
            text: 'El usuario se ha registrado correctamente.',
          });
          this.resetForm();
          this.getUser();

        },
        (error: any) => {
          if (error.status === 400 && error.error && error.error.message) {
            // Filtra la cadena "BAD_REQUEST :: " del mensaje de error
            const errorMessage = error.error.message.replace(/BAD_REQUEST :: /i, '');
            // Muestra el mensaje de error específico de la respuesta HTTP
            this.showCustomErrorAlert(errorMessage);
          } 
        }
      );
    }

    updateUsuario(): void { 
      const id = this.selectUsuario.id ?? 0; 
      const data = this.UsuarioForm.value;
      console.log('Datos a enviar para actualizar:', data); // Agregar esta línea
      //data.role.id = parseInt(data.role.id.toString());
      this.usuarioService.updateUsuario(id, data).subscribe((response) => {
        console.log(response);
        this.getUser();
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          text: 'El usuario se ha actualizado correctamente.',
        });
        this.UsuarioForm.reset();
        this.selectUsuario = {};
      });
    }
    eliminarUsuario(id: number):void {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'No podrá revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe(data => {
            if (data && data) {
              this.listadousuario = data;
            }
            this.getUser();
          })
          Swal.fire(
            'Eliminado',
            'El usuario ha sido eliminado',
            'success'
          )
        }
      }
      )

      

    

    } 

    resetForm() {
      // Suponiendo que `miFormulario` es el FormGroup asociado a tu formulario
      this.UsuarioForm.reset(); 
    }

      // Función para mostrar un mensaje de error específico
showCustomErrorAlert(errorMessage: string) {
  Swal.fire({
    title: 'Error',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
}

    getEventValue(event: any): string {
      return event.target.value;
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

    validarFormatoCorreo(control: FormControl) {
      if (control.touched) { // Verificar si el campo ha sido tocado por el usuario
        const email = control.value;
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    
        if (!pattern.test(email)) {
          return { formatoCorreoInvalido: true };
        }
      }
    
      return null;
    }

}
