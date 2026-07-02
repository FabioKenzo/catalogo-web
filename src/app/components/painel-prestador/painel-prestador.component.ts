import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-painel-prestador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-prestador.component.html',
  styleUrl: './painel-prestador.component.css'
})
export class PainelPrestadorComponent implements OnInit {

  carregando: boolean = false;

  //mesmas variaveis integradas do HTML atual via ngModel
  categoria: string = '';
  bairro: string = '';
  whatsapp: string = '';
  descricao: string = '';

  usuarioId: number | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      const user = JSON.parse(usuarioLogado);
      this.usuarioId = user.id;
    }
  }

  salvarServico(): void {
    if (!this.usuarioId) {
      alert('Erro: Utilizador não identificado. Faça login novamente.');
      return;
    }

    this.carregando = true;

    const dadosServico = {
      nomeNegocio: this.categoria,
      descricao: this.descricao,
      bairro: this.bairro,
      whatsapp: this.whatsapp,

      //Envia o objeto que o Java chamara em getCategorias
      categorias: {
        nomeCategoria: this.categoria.trim() // Envia o texto digitado
      },

      //fallbacks adicionais de seguranca para mapeamento de DTOs
      nomeCategoria: this.categoria.trim(),
      categoria: this.categoria.trim(),

      //mapeamento do user dono do servico
      usuarioId: this.usuarioId,
      usuario: {
        id: this.usuarioId
      },
      usuarios: {
        id: this.usuarioId
      }
    };

    console.log('Enviando objeto estruturado para o Java:', dadosServico);

    //chama o ApiService passando o objeto adaptado
    this.apiService.salvarComercioLivre(dadosServico).subscribe({
      next: (resposta: any) => {
        this.carregando = false;
        console.log('Serviço gravado com sucesso:', resposta);
        alert('Serviço guardado com sucesso no banco de dados!');

        // Mantem a feature importante de limpar o formulário apos sucesso
        this.categoria = '';
        this.bairro = '';
        this.whatsapp = '';
        this.descricao = '';
      },
      error: (err: any) => {
        this.carregando = false;
        console.error('Erro ao salvar no Java:', err);

        //exibe o erro real vindo do Java caso ainda falte alguma validacao
        const mensagemErro = err.error || 'Não foi possível salvar os dados do seu serviço no momento.';
        alert('Erro: ' + mensagemErro);
      }
    });
  }
}