import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  usuario = {
    nome: '',
    email: '',
    senha: '',
    tipoPerfil: '' 
  };

  // Injetando o ApiService e o Router 
  constructor(private apiService: ApiService, private router: Router) {}

  cadastrar(): void {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.senha || !this.usuario.tipoPerfil) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    console.log('Enviando dados reais para o Java:', this.usuario);

    // Chamada real para o backend Spring 
    this.apiService.cadastrarUsuario(this.usuario).subscribe({
      next: (resposta) => {
        console.log('Usuário cadastrado com sucesso no banco!', resposta);
        alert(`Conta criada com sucesso como ${this.usuario.tipoPerfil}!`);
        
        // Redirecionamento inteligente baseado no perfil mapeado
        if (this.usuario.tipoPerfil === 'PRESTADOR') {
         
          this.router.navigate(['/']); 
        } else {
          this.router.navigate(['/']); // Consumidor volta direto para a home de busca
        }
      },
      error: (err) => {
        console.error('Erro ao cadastrar no Java:', err);
        
        alert('Erro ao cadastrar: ' + (err.error || 'Erro interno do servidor.'));
      }
    });
  }
}
