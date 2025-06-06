import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  standalone: true,  // Indica che questo è un componente standalone
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  imports: [CommonModule]  // Importa CommonModule per usare le direttive di Angular come ngIf
})
export class LoadingComponent implements OnInit {

  isLoading!: boolean;

  constructor(private loadingService: LoadingService) {
    // Subscribe al servizio per aggiornare lo stato di isLoading
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    //loadingService.showLoading(); 
  }

  ngOnInit(): void {}
}
