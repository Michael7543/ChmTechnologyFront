export class UsuarioDTO {
  id:number;
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    email: string;
    username: string;
    password: string;
    role: {id:number};

    constructor(data: UsuarioDTO) {
      this.id = data.id;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.telefono = data.telefono;
      this.direccion = data.direccion;
      this.email = data.email;
      this.username = data.username;
      this.password = data.password;
      this.role = data.role;
    }
  }