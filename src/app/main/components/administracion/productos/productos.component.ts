import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CategoriaModel } from 'src/app/main/entities/Categoria';
import { ImagenModel, UpdateImagenDTO } from 'src/app/main/entities/Imagen';
import {
    ProductoModel,
    UpdateProductoDTO,
} from 'src/app/main/entities/Producto';
import { ESTADO } from 'src/app/main/enums/Estado';
import { CategoriaService } from 'src/app/main/services/categoria.service';
import { ImagenesService } from 'src/app/main/services/imagenes.service';
import { ProductosService } from 'src/app/main/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  ProductosForm: FormGroup = new FormGroup({});
  ImagenForm: FormGroup = new FormGroup({});
  isUploading = false;
  selectedFile: string | ArrayBuffer | null = null;
  listadoproductos: ProductoModel[] = [];
  listadoimagenes: ImagenModel[] = [];
  listadocategoria: CategoriaModel[] = [];
  selectProducto: UpdateProductoDTO = {};
  selectImagen: UpdateImagenDTO = {};
  estados = Object.values(ESTADO);
  loading: boolean = true;

  constructor(
    private productoService: ProductosService,
    private form: FormBuilder,
    private imagenService: ImagenesService,
    private categoriaService: CategoriaService
  ) {
    {
      this.ProductosForm = this.form.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        marca: ['', Validators.required],
        precio: [0, Validators.required],
        stock: [0, Validators.required],
        categoria: ['', Validators.required],
        estado: ['', Validators.required],
        codigo: ['', Validators.required],
        modelo: ['', Validators.required],
        file: ['']
      });
    }
    {
      this.ImagenForm = this.form.group({
        //filename: [''],
        file: [null]
      });
    }
  }

  ngOnInit(): void {
    this.getProducto();
    this.getCategoria();
    this.getImagenes();
  }

  async getProducto() {
    try {
      const data = await firstValueFrom(this.productoService.getProductos());
      this.listadoproductos = data;
      this.loading = false;
      //console.log('Productos:', this.listadoproductos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
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
      //console.log(this.listadoimagenes);
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    }
  }

  async getCategoria() {
    try {
      const data = await firstValueFrom(this.categoriaService.getCategoria());
      this.listadocategoria = data;
      //console.log(this.listadocategoria);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  }

  trackByCategoria(index: number, categoria: any): number {
    return categoria.id;
  }

  editProducto(lista: any) {
    //console.log('Datos recibidos para editar:', lista);
    this.selectProducto = lista;
    const filename = lista.imagenes && lista.imagenes.length > 0 ? lista.imagenes[0].filename : '';
  
    //console.log('Filename capturado:', filename); // Agregar este //console.log
  
    this.ProductosForm.patchValue({
      nombre: lista.nombre,
      descripcion: lista.descripcion,
      marca: lista.marca,
      stock: lista.stock,
      precio: lista.precio,
      categoria: lista.categoria.nombre,
      estado: lista.estado,
      codigo: lista.codigo,
      modelo: lista.modelo,
      file: lista.file
    });
  }

  editImagen(listaimg: any) {
    //console.log('Datos recibidos de imagen para editar:', listaimg);
    this.selectImagen = listaimg;
    const filename = listaimg.imagenes && listaimg.imagenes.length > 0 ? listaimg.imagenes[0].filename : '';
  
    //console.log('Filename capturado:', filename); // Agregar este //console.log
  
   
      this.ImagenForm.patchValue({
        filename: filename,
      // file: listaimg.file
      });
    
    //console.log('datos del filename',filename)
  }
  saveProductos() {
    const id = this.selectProducto.id ?? 0;
    //console.log('Valor de la ID en saveCategoria:', id);

    if (id) {
      this.updateProducto(id);
      //console.log('Actualizando producto existente. ID:', id);
    } else {
      this.agregarProductos();
      //console.log('Agregando nueva categoría sin ID');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ProductosForm.patchValue({ file });
      this.ProductosForm.get('file')?.updateValueAndValidity();

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
    this.ProductosForm.patchValue({
      file,
    });
  }

  async agregarProductos() {
    if (this.ProductosForm.valid) {
      const formData = new FormData();

      // Agregar los campos del formulario al FormData
      Object.keys(this.ProductosForm.value).forEach((key) => {
        formData.append(key, this.ProductosForm.get(key)?.value);
      });

      try {
        // Enviar el FormData al servicio utilizando firstValueFrom
        const response = await firstValueFrom(
          this.productoService.crearProductos(formData)
        );
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          text: 'El producto se ha creado correctamente.',
        });
        //console.log('Producto creado con éxito:', response);
        this.getProducto();
      } catch (error) {
        console.error('Error al crear producto:', error);
        // Maneja el error según tus necesidades
      }
    }
  }

  async updateProducto(id: number): Promise<void> {
    const data = this.ProductosForm.value;
    //console.log('Datos a enviar para actualizar:', data);
  
    try {
      // Dentro de la función updateProducto
      //console.log('ID a actualizar:', id);
      //console.log('Datos a enviar para actualizar:', data);
  
      const response = await firstValueFrom(
        this.productoService.updateProducto(id, data)
      );
  
      //console.log(response);
      this.getProducto();
  
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        text: 'El producto se ha actualizado correctamente.',
      });
  
      this.ProductosForm.reset();
      this.selectProducto = {};
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      // Manejar el error según tus necesidades
    }
  }

  async updateImagenes(): Promise<void> {
    
  
      const filename = Array.isArray(this.selectProducto.imagenes) ? this.selectProducto.imagenes[0]?.filename ?? '' : '';
        
      const formData = new FormData();
      Object.keys(this.ProductosForm.value).forEach((key) => {
        formData.append(key, this.ProductosForm.get(key)?.value);
      });
  
      try {
        //console.log('filename a actualizar:', filename);
        //console.log('Datos a enviar para actualizar:', formData);
  
        const response = await firstValueFrom(
          this.imagenService.updateImagenes(filename, formData)
        );
  
        //console.log(response);
        this.getProducto();
        
  
        Swal.fire({
          icon: 'success',
          title: 'Imagen actualizada',
          text: 'La imagen se ha actualizado correctamente.',
        });
  
        this.ProductosForm.reset();
        this.selectProducto = {};
      } catch (error) {
        console.error('Error al actualizar imagen:', error);
        // Manejar el error según tus necesidades
      }
    
  }

  
  
  
  eliminarProducto(id: number): void {
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
        this.productoService.eliminarProductos(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
            this.getProducto(); // Vuelve a cargar la lista después de la eliminación
          },
          (error) => {
            console.error('Error al eliminar producto:', error);
            // Maneja el error según tus necesidades
          }
        );
      }
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
}
