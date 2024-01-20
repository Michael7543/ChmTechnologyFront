export class CategoriaDto {
    id:number;
    nombre:string;
    descripcion:string;
    estado:string;

    constructor(data: CategoriaDto) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.estado = data.estado;
    }
  
  }
  