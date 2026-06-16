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
  // Força o teclado a fechar
  (document.activeElement as HTMLElement)?.blur();

  // ALERTA 1: Mostra o que o Angular capturou dos inputs antes de enviar
  alert(`[DEBUG 1] Enviando -> Termo: "${this.termoBusca}" | Bairro: "${this.bairroBusca}"`);

  this.apiService.buscarServicos(this.termoBusca, this.bairroBusca).subscribe({
    next: (dados: any[]) => { 
      this.prestadores = dados;
      this.pesquisaFeita = true;
      console.log('Resultados encontrados no Java:', dados);
      
      // ALERTA 2: Mostra quantos registros voltaram do banco
      alert(`[DEBUG 2] Sucesso! Registros retornados do Java: ${dados.length}`);
    },
    error: (err: any) => {
      console.error('Erro ao conectar com o servidor backend:', err);
      
      // ALERTA 3: Destrincha o erro real de rede do iPhone na tela
      alert(`[DEBUG ERRO] Status: ${err.status} | Msg: ${err.message} | Nome: ${err.name}`);
    }
  });
}
}
