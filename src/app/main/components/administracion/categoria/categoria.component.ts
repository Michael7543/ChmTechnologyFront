import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
    CategoriaModel,
    UpdateCategoriaDTO,
} from 'src/app/main/entities/Categoria';
import { ESTADO } from 'src/app/main/enums/Estado';
import { CategoriaService } from 'src/app/main/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  CategoriaForm: FormGroup = new FormGroup({});
  listadocategoria: CategoriaModel[] = [];
  selectCategoria: UpdateCategoriaDTO = {};
  estados = Object.values(ESTADO);
  loading: boolean = true;

  constructor(
    private form: FormBuilder,
    private categoriaService: CategoriaService
  ) {
    {
      this.CategoriaForm = this.form.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        estado: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getCategoria();
    
  }

   async getCategoria() {
    try {
      const data = await firstValueFrom(this.categoriaService.getCategoria());
      this.listadocategoria = data;
      this.loading = false;
      //console.log('Productos:', this.listadocategoria);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  editCategoria(lista: any) {
    //console.log('Datos recibidos para editar:', lista);
    this.selectCategoria = lista;
    this.CategoriaForm.setValue({
      nombre: lista.nombre,
      descripcion: lista.descripcion,
      estado: lista.estado,
    });
  
    //console.log('esta es mi id',this.selectCategoria.id);
  }
  saveCategoria() {
    const id = this.selectCategoria.id ?? 0; 
    //console.log('Valor de la ID en saveCategoria:', id);
  
    if (id) {
      this.updateCategoria(id);
      //console.log('Actualizando producto existente. ID:', id);
    } else {
      this.agregarCategoria();
      //console.log('Agregando nueva categoría sin ID');
    }
  }
  
  agregarCategoria() {
    let categoria: CategoriaModel = this.CategoriaForm.value;

    //console.log('Datos del formulario:', categoria);
    this.categoriaService.crearCategoria(categoria).subscribe(
      (response: any) => {
        // Muestra el token en la consola para depuración
        Swal.fire({
          icon: 'success',
          title: 'Categoria Creada',
          text: 'La categoria se ha creado correctamente.',
        });
        this.resetForm();
        this.getCategoria();
      },
      (error: any) => {
        if (error.status === 400 && error.error && error.error.message) {
          // Filtra la cadena "BAD_REQUEST :: " del mensaje de error
          const errorMessage = error.error.message.replace(
            /BAD_REQUEST :: /i,
            ''
          );
          // Muestra el mensaje de error específico de la respuesta HTTP
          this.showCustomErrorAlert(errorMessage);
        }
      }
    );
  }

  updateCategoria(id:number): void {
    const data = this.CategoriaForm.value;
    //console.log('Datos a enviar para actualizar:', data);

    this.categoriaService.updateCategoria(id, data).subscribe(
      (response) => {
        //console.log(response);
        this.getCategoria();
        Swal.fire({
          icon: 'success',
          title: 'Categoria actualizado',
          text: 'El categoria se ha actualizado correctamente.',
        });
        this.CategoriaForm.reset();
        this.selectCategoria = {}; 
      },
      (error) => {
        console.error('Error al actualizar categoria:', error);
        // Manejar el error según tus necesidades
        
      }
    );
  }

 
  
  
  

  eliminarCategoria(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrá revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'La categoria ha sido eliminado', 'success');
            this.getCategoria(); // Vuelve a cargar la lista después de la eliminación
          },
          (error) => {
            console.error('Error al eliminar categoria:', error);
            // Maneja el error según tus necesidades
          }
        );
      }
    });
  }

  getEventValue(event: any): string {
    return event.target.value;
  }

  resetForm() {
    this.CategoriaForm.reset();
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
}
