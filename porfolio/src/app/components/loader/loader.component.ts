import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public isLoading!: boolean;

  constructor() { this.isLoading = false}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = true;
    }, 3000);
  }

}
