import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/entities/person';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  public persons: Person[] = [];
  public editPerson!: Person;
  roles: string[] = [];
  isAdmin = false;

  constructor(private userService: PersonService,  private tokenService: TokenService ) { }

  ngOnInit(): void {
    this.getPersons();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getPersons(): void {
    this.userService.getPersons().subscribe({
      next: (response: Person[]) => {
        this.persons = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }


  public onEditPerson(person: Person): void {
    this.userService.updatePerson(person).subscribe({
      next: (response: Person) => {
        console.log(response);
        this.getPersons();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }


  public onOpenModal(person: Person, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.editPerson = person;
      button.setAttribute('data-bs-target', '#editUserModal');
    }
    container?.appendChild(button);
    button.click();
  }


}
