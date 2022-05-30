import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { TokenService } from 'src/app/services/token.service';
import { Project } from '../../entities/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects: Project[] = [];
  public editProject!: Project;
  public deleteProject!: Project;
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private projectService: ProjectService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getProjects();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (response: Project[]) => {
        this.projects = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddProject(addForm: NgForm): void {
    document.getElementById("add-project-form")!.click();
    this.projectService.addProject(addForm.value).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onEditProject(project: Project): void {
    this.projectService.updateProject(project).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProjects();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(project: Project, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addProjectModal');
    }
    if (mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-bs-target', '#editProjectModal');
    }
    if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-bs-target', '#deleteProjectModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
