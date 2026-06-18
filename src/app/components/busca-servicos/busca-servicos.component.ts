import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, ServicoDTO } from '../../services/api.service'; 

@Component({
  selector: 'app-busca-servicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca-servicos.component.html',
  styleUrls: ['./busca-servicos.component.css']
})
export class BuscaServicosComponent {

  termoBusca: string = '';
  bairroBusca: string = '';

  
  prestadores: ServicoDTO[] = [];
  pesquisaFeita: boolean = false;

  constructor(private apiService: ApiService) {}

  pesquisar(): void {
    // Fecha o teclado virtual do celular imediatamente
    (document.activeElement as HTMLElement)?.blur();

    // Limpa os espaços invisíveis das pontas que o iOS gera
    const termoLimpo = this.termoBusca ? this.termoBusca.trim() : '';
    const bairroLimpo = this.bairroBusca ? this.bairroBusca.trim() : '';

    // Dispara a requisição limpa para o Back-end
    this.apiService.buscarServicos(termoLimpo, bairroLimpo).subscribe({
      next: (dados: ServicoDTO[]) => { // 🔄 tipado corretamente
        this.prestadores = dados;
        this.pesquisaFeita = true;
        console.log('Resultados encontrados no Java:', dados);

        // Exemplo: acessar dados tipados
        dados.forEach(servico => {
          console.log(`Categoria: ${servico.categoria}, Bairro: ${servico.bairro}`);
          if (servico.usuario) {
            console.log(`Prestador: ${servico.usuario.nome}`);
          }
        });
      },
      error: (err) => {
        console.error('Erro ao conectar com o servidor backend:', err);
      }
    });
  }
}

