import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // Variável que controla se o menu mobile está aberto (true) ou fechado (false)
  menuAberto: boolean = false;

  // Função que inverte o valor da variável toda vez que o botão for clicado
  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  estaLogado(): boolean {
    return localStorage.getItem('usuarioLogado') !== null;
  }

  getNomeUsuario(): string {
    const usuarioJson = localStorage.getItem('usuarioLogado');
    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      return usuario.nome.split(' ')[0];
    }
    return '';
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/';
  }

  isPrestador(): boolean {
  const usuarioJson = localStorage.getItem('usuarioLogado');
  if (usuarioJson) {
    const usuario = JSON.parse(usuarioJson);
    return usuario.tipoPerfil === 'PRESTADOR'; // Valida o perfil que veio do Java
  }
  return false;
}
}