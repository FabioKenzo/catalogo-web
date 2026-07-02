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

  carregando: boolean = false;
  dadosLogin = { email: '', senha: '' };

  constructor(private apiService: ApiService, private router: Router) { }

  logar(): void {
    if (!this.dadosLogin.email || !this.dadosLogin.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    this.carregando = true;

    this.apiService.login(this.dadosLogin).subscribe({
      next: (resposta: any) => {
        this.carregando = false;
        console.log('Resposta bruta do Login do Java:', resposta);

        //salva o token JWT real que veio do backend
        if (resposta && resposta.token) {
          localStorage.setItem('token', resposta.token);
        }

        //monta o objeto incluindo o id que o java manda
        const usuarioLogado = {
          id: resposta.id, //captura o id do java
          nome: resposta.nome || 'Usuário',
          tipoPerfil: resposta.tipoPerfil || 'CONSUMIDOR'
        };

        //grava no localStorage antes de qualquer acao
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        alert(`Bem-vindo de volta, ${usuarioLogado.nome.split(' ')[0]}!`);

        //força o recarregamento total para a navbar capturar o estado atualizado
        window.location.href = '/';
      },
      error: (err: any) => {
        this.carregando = false;
        console.error('Erro ao logar:', err);
        alert('Erro ao autenticar: ' + (err.error || 'E-mail ou senha incorretos.'));
      }
    });
  }
}