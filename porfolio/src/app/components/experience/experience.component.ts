import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from 'src/app/entities/experience';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  public experiences: Experience[] = [];
  public editExperience!: Experience;
  public deleteExperience!: Experience;
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private experienceService: ExperienceService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getExperiences();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getExperiences(): void {
    this.experienceService.getExperiences().subscribe({
      next: (response: Experience[]) => {
        this.experiences = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddExperience(addForm: NgForm): void {
    document.getElementById("add-experience-form")!.click();
    this.experienceService.addExperience(addForm.value).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onEditExperience(experience: Experience): void {
    this.experienceService.updateExperience(experience).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteExperience(experienceId: number): void {
    this.experienceService.deleteExperience(experienceId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiences();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(experience: Experience, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addExperienceModal');
    }
    if (mode === 'edit') {
      this.editExperience = experience;
      button.setAttribute('data-bs-target', '#editExperienceModal');
    }
    if (mode === 'delete') {
      this.deleteExperience = experience;
      button.setAttribute('data-bs-target', '#deleteExperienceModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
