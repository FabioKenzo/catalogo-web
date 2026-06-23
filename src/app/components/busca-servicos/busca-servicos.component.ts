import { Component, OnInit } from '@angular/core';
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
export class BuscaServicosComponent implements OnInit {

  termoBusca: string = '';
  bairroBusca: string = '';
  prestadores: ServicoDTO[] = [];
  tituloSecao: string = 'Prestadores em Destaque';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Carrega os prestadores iniciais assim que a página abre
    this.carregarPrestadoresIniciais();
  }

  // Método que o HTML chama para gerar o link do botão
  gerarLinkWhatsApp(whatsapp: string | undefined, nome: string | undefined, categoria: string | undefined): string {
    if (!whatsapp) return '#';

    // Remove qualquer caractere que não seja número (parênteses, espaços, hífen)
    const numeroLimpo = whatsapp.replace(/\D/g, '');

    // Garante que tenha o DDI do Brasil (55) na frente se o usuário não digitou
    const telefoneFinal = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`;

    const texto = `Olá ${nome || ''}, vi seu anúncio de ${categoria || 'serviços'} no Catálogo de Serviços e gostaria de solicitar um orçamento!`;

    // Retorna a URL codificada para o WhatsApp web/app
    return `https://api.whatsapp.com/send?phone=${telefoneFinal}&text=${encodeURIComponent(texto)}`;
  }

  carregarPrestadoresIniciais(): void {
    this.apiService.buscarServicos('', '').subscribe({
      next: (dados: ServicoDTO[]) => {
        // CORRIGIDO: Garante e força o limite máximo de 6 elementos na Home
        this.prestadores = dados.slice(0, 6);
        this.tituloSecao = 'Prestadores em Destaque';
      },
      error: (err) => {
        console.error('Erro ao carregar destaques iniciais:', err);
      }
    });
  }

  pesquisar(): void {
    (document.activeElement as HTMLElement)?.blur();

    const termoLimpo = this.termoBusca ? this.termoBusca.trim() : '';
    const bairroLimpo = this.bairroBusca ? this.bairroBusca.trim() : '';

    if (!termoLimpo && !bairroLimpo) {
      this.carregarPrestadoresIniciais();
      return;
    }

    this.apiService.buscarServicos(termoLimpo, bairroLimpo).subscribe({
      next: (dados: ServicoDTO[]) => {
        // Quando o usuário fizer uma busca real, trazemos todos os resultados encontrados
        this.prestadores = dados;
        this.tituloSecao = 'Profissionais Encontrados';

        dados.forEach(servico => {
          if (servico.usuarios) {
            console.log(`Prestador: ${servico.usuarios.nome}`);
          }
        });
      },
      error: (err) => {
        console.error('Erro ao conectar com o servidor backend:', err);
      }
    });
  }
}
