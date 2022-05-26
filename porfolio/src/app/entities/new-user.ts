export class NewUser {
  name: string;
  nameUser: string;
  password: string;

  constructor(name: string, nameUser: string, password: string) {
      this.name = name;
      this.nameUser = nameUser;
      this.password = password;
  }
}
