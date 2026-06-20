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

  //controla a exibicap do overlay de loading na tela
  carregando: boolean = false;

  // DEFINICAO DAS PROPRIEDADES 
  categoria: string = '';
  bairro: string = '';
  telefone: string = '';
  descricao: string = '';
  
  usuarioId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    //recupera o ID do utilizador logado para associar ao servico
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

    // liga o loading
    this.carregando = true;

    //monta o objeto com os nomes das propriedades 
    const dadosServico = {
      categoria: this.categoria,
      bairro: this.bairro,
      telefone: this.telefone,
      descricao: this.descricao,
      usuarioId: this.usuarioId
    };

    // faz envio pro spring
    this.apiService.salvarServico(dadosServico).subscribe({
      next: (resposta: any) => {
        //se der certo o loading para
        this.carregando = false;

        console.log('Serviço gravado com sucesso no MySQL:', resposta);
        alert('Serviço guardado com sucesso no banco de dados!');
        
        //limpa o formulario apos salvar
        this.categoria = '';
        this.bairro = '';
        this.telefone = '';
        this.descricao = '';
      },
      error: (err: any) => {
        //se der erro desliga o loading para tentar novamente
        this.carregando = false;

        console.error('Erro ao salvar serviço no Java:', err);
        alert('Erro ao guardar o serviço. Verifique a consola do Spring Boot.');
      }
    });
  }
}
