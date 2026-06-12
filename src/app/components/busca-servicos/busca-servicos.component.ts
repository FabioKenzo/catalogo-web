import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-busca-servicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca-servicos.component.html',
  styleUrl: './busca-servicos.component.css'
})
export class BuscaServicosComponent {

  termoBusca: string = '';
  bairroBusca: string = '';

  prestadores: any[] = [];
  pesquisaFeita: boolean = false;

  constructor(private apiService: ApiService) {}

  pesquisar(): void {
  
    this.apiService.buscarServicos(this.termoBusca, this.bairroBusca).subscribe({
      next: (dados: any[]) => { 
        this.prestadores = dados;
        this.pesquisaFeita = true;
        console.log('Resultados encontrados no Java:', dados);
      },
      error: (err: any) => {
        console.error('Erro ao conectar com o servidor backend:', err);
        alert('Erro ao conectar com o servidor backend.');
      }
    });
  }
}
