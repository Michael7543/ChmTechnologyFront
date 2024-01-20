import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RolesModel } from 'src/app/main/entities/Roles';
import { ServiciosChmModel, UpdateServicioDTO } from 'src/app/main/entities/ServiciosChm';
import { ImagenModel } from 'src/app/main/entities/Imagen';
import { CategoriaModel } from 'src/app/main/entities/Categoria';
import Swal from 'sweetalert2';
import { CategoriaService } from 'src/app/main/services/categoria.service';
import { ImagenesService } from 'src/app/main/services/imagenes.service';
import { ServicioChmService } from 'src/app/main/services/servicioschm.service';
import { ESTADO } from 'src/app/main/enums/Estado';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  ServiciosForm: FormGroup = new FormGroup({});
  isUploading = false;
  selectedFile: string | ArrayBuffer | null = null;
  listadoservicios: ServiciosChmModel[] = []; 
  listadoimagenes: ImagenModel[] = [];
  listadocategoria: CategoriaModel[] = [];
  selectServicio: UpdateServicioDTO = {};
  selectedfile: File| null = null ;
  estados = Object.values(ESTADO); 
  loading: boolean = true;

  constructor(private servicioService: ServicioChmService, private form: FormBuilder,private imagenService:ImagenesService,
    private categoriaService:CategoriaService) {
    {
      this.ServiciosForm = this.form.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        categoria: ['', Validators.required],
        estado: ['', Validators.required],
        file: ['',]
      })
    }


  }

  ngOnInit(): void {
    this.getServicio();
    this.getCategoria();
    this.getImagenes();
    
   
  }

  

  async getServicio() {
    try {
      const data = await firstValueFrom(this.servicioService.getServicio());
      this.listadoservicios = data;
      console.log(this.listadoservicios);
    } catch (error) {
      console.error('Error al obtener servicio:', error);
    }
  }

  trackByImagen(index: number, imagen: any): number {
    return imagen.id;
  }

  

  async getImagenes() {
    try {
      const data = await firstValueFrom(this.imagenService.getImagenes());
      this.listadoimagenes = data;
      this.loading = false;
      console.log(this.listadoimagenes);
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    }
  }
  async getCategoria() {
    try {
      const data = await firstValueFrom(this.categoriaService.getCategoria());
      this.listadocategoria = data;
      console.log(this.listadocategoria);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  }

  trackByCategoria(index: number, categoria: any): number {
    return categoria.id;
  }
  editServicio(lista:any){
    console.log('Datos recibidos para editar:', lista);
    this.selectServicio = lista;
    
    this.ServiciosForm.patchValue({
      nombre: lista.nombre,
      descripcion: lista.descripcion,
      categoria: lista.categoria.nombre,
      file: lista.file,
      estado: lista.estado
      

    });
    
  }

  saveServicio() {
    const id = this.selectServicio.id ?? 0;
    console.log('Valor de la ID en saveCategoria:', id);

    if (id) {
      this.updateServicio(id);
      console.log('Actualizando producto existente. ID:', id);
    } else {
      this.agregarServicio();
      console.log('Agregando nueva categoría sin ID');
    }
  }

  
  agregarServicio() {
    if (this.ServiciosForm) {
      const formData = new FormData();

      // Agregar los campos del formulario al FormData
      formData.append('nombre', this.ServiciosForm.get('nombre')?.value);
      formData.append(
        'descripcion',
        this.ServiciosForm.get('descripcion')?.value
      );
      formData.append('categoria', this.ServiciosForm.get('categoria')?.value);
      formData.append('estado', this.ServiciosForm.get('estado')?.value);
      console.log('FormData antes de enviar:', formData);
      // Agregar la imagen al FormData
      const file = this.ServiciosForm.get('file')?.value;
      if (file) {
        formData.append('file', file);
      }

      // Enviar el FormData al servicio
      this.servicioService.crearServicio(formData).subscribe(
        (response) => {
          console.log('Servicio creado con éxito:', response);
          this.getServicio();
          Swal.fire('Éxito', 'El servicio ha sido creado con éxito', 'success');
        },
        (error) => {
          console.error('Error al crear servicio:', error);
          Swal.fire('Error', 'Ocurrió un error al crear el servicio', 'error');
          // Maneja el error según tus necesidades
        }
      );
    }
  }
 

  
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ServiciosForm.patchValue({ file });
      this.ServiciosForm.get('file')?.updateValueAndValidity();

      // Vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
    }
  }
  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.ServiciosForm.patchValue({
      file,
    });
  }

  async updateServicio(id: number): Promise<void> {
    const data = this.ServiciosForm.value;
    console.log('Datos a enviar para actualizar:', data);
  
    try {
      // Dentro de la función updateProducto
      console.log('ID a actualizar:', id);
      console.log('Datos a enviar para actualizar:', data);
  
      const response = await firstValueFrom(
        this.servicioService.updateServicio(id, data)
      );
  
      console.log(response);
      this.getServicio();
  
      Swal.fire({
        icon: 'success',
        title: 'Servicio actualizado',
        text: 'El servicio se ha actualizado correctamente.',
      });
  
      this.ServiciosForm.reset();
      this.selectServicio = {};
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      // Manejar el error según tus necesidades
    }
  }
  
  
  
  


  eliminarServicio(id: number):void {
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
        this.servicioService.eliminarServicio(id).subscribe(data => {
          if (data && data) {
            this.listadoservicios = data;
          }
          this.getServicio();
        })
        Swal.fire(
          'Eliminado',
          'El servicio ha sido eliminado',
          'success'
        )
      }
    }
    )

    

  

  } 

  getEventValue(event: any): string {
    return event.target.value;
  }





 
 
}
