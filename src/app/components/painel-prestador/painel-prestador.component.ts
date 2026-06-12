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

  // DEFINIÇÃO DAS PROPRIEDADES 
  categoria: string = '';
  bairro: string = '';
  telefone: string = '';
  descricao: string = '';
  
  usuarioId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Recupera o ID do utilizador logado para associar ao serviço
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

    // Monta o objeto com os nomes das propriedades 
    const dadosServico = {
      categoria: this.categoria,
      bairro: this.bairro,
      telefone: this.telefone,
      descricao: this.descricao,
      usuarioId: this.usuarioId
    };

    // Faz o envio real para o Spring 
    this.apiService.salvarServico(dadosServico).subscribe({
      next: (resposta: any) => {
        console.log('Serviço gravado com sucesso no MySQL:', resposta);
        alert('Serviço guardado com sucesso no banco de dados!');
        
        // Limpa o formulário após salvar
        this.categoria = '';
        this.bairro = '';
        this.telefone = '';
        this.descricao = '';
      },
      error: (err: any) => {
        console.error('Erro ao salvar serviço no Java:', err);
        alert('Erro ao guardar o serviço. Verifique a consola do Spring Boot.');
      }
    });
  }
}
