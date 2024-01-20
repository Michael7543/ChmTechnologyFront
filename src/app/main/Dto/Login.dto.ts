export class LoginDto{
    username: String;
    password: String;

    constructor(data: LoginDto) {
        this.username = data.username;
        this.password = data.password;
    }
  }