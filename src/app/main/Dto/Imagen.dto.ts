export class ImagenDto {
    id:number;
    filename:string;
    file_path:string;
    publicUrl:string;
    file: File;

    constructor(data: ImagenDto) {
        this.id = data.id;
        this.filename = data.filename;
        this.file_path = data.file_path;
        this.publicUrl = data.publicUrl;
        this.file = data.file;
    }

 
 }
 