import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, UsuarioDTO } from '../../services/api.service'; 
import { Router } from '@angular/router';

//Interface específica para cadastro
interface UsuarioCadastro {
  nome: string;
  email: string;
  senha: string;
  tipoPerfil: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {


  usuario: UsuarioCadastro = {
    nome: '',
    email: '',
    senha: '',
    tipoPerfil: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  cadastrar(): void {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.senha || !this.usuario.tipoPerfil) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    console.log('Tentando cadastrar usuário...');

    //Envia UsuarioCadastro e recebe UsuarioDTO
    this.apiService.cadastrarUsuario(this.usuario).subscribe({
      next: (resposta: UsuarioDTO) => {
        console.log('Usuário cadastrado com sucesso no banco!');
        alert(`Conta criada com sucesso como ${resposta.tipoPerfil}!`);

        //guarda os dados retornados 
        localStorage.setItem('usuarioLogado', JSON.stringify(resposta));

        // Redirecionamento baseado no perfil confirmado pelo backend
        if (resposta.tipoPerfil === 'PRESTADOR') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Erro ao cadastrar no Java:', err);
        alert('Erro ao cadastrar: ' + (err.error || 'Erro interno do servidor.'));
      }
    });
  }
}
