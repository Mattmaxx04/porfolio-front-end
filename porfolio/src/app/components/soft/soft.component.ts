import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SoftService } from 'src/app/services/soft.service';
import { TokenService } from 'src/app/services/token.service';
import { Soft } from '../../entities/soft';

@Component({
  selector: 'app-soft',
  templateUrl: './soft.component.html',
  styleUrls: ['./soft.component.css']
})
export class SoftComponent implements OnInit {

  public softs: Soft[] = [];
  public editSoft!: Soft;
  public deleteSoft!: Soft;
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private softService: SoftService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getSofts();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getSofts(): void {
    this.softService.getSofts().subscribe({
      next: (response: Soft[]) => {
        this.softs = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddSoft(addForm: NgForm): void {
    document.getElementById("add-Soft-form")!.click();
    this.softService.addSoft(addForm.value).subscribe({
      next: (response: Soft) => {
        console.log(response);
        this.getSofts();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onEditSoft(soft: Soft): void {
    this.softService.updateSoft(soft).subscribe({
      next: (response: Soft) => {
        console.log(response);
        this.getSofts();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteSoft(softId: number): void {
    this.softService.deleteSoft(softId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getSofts();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(soft: Soft, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addSoftModal');
    }
    if (mode === 'edit') {
      this.editSoft = soft;
      button.setAttribute('data-bs-target', '#editSoftModal');
    }
    if (mode === 'delete') {
      this.deleteSoft = soft;
      button.setAttribute('data-bs-target', '#deleteSoftModal');
    }
    container?.appendChild(button);
    button.click();
  }
}

