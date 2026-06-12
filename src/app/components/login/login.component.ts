import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Objeto simples contendo apenas o que o endpoint de login pede
  dadosLogin = {
    email: '',
    senha: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  logar(): void {
    if (!this.dadosLogin.email || !this.dadosLogin.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    console.log('Tentando realizar login no Java:', this.dadosLogin);

    // Chamando o método no service
    this.apiService.login(this.dadosLogin).subscribe({
      next: (usuarioLogado) => {
        console.log('Login efetuado com sucesso!', usuarioLogado);
        alert(`Bem-vindo de volta, ${usuarioLogado.nome}!`);
        
        //guarda os dados do usuário na sessão para saber quem está logado
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        
        // Redireciona para a home de busca
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao logar:', err);
        // Exibe o erro retornado pelo runtime
        alert('Erro ao autenticar: ' + (err.error || 'E-mail ou senha incorretos.'));
      }
    });
  }
}