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
    // Força o teclado do celular (iOS/Android) a fechar na hora do clique
    (document.activeElement as HTMLElement)?.blur();

    // Remove espaços em branco extras que o teclado do iPhone joga nas pontas
    const termoLimpo = this.termoBusca ? this.termoBusca.trim() : '';
    const bairroLimpo = this.bairroBusca ? this.bairroBusca.trim() : '';

    // Envia os dados perfeitamente limpos para a API Java
    this.apiService.buscarServicos(termoLimpo, bairroLimpo).subscribe({
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
