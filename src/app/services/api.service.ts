import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioDTO {
  id: number; 
  nome: string; 
  email: string; 
  tipoPerfil: string;
}

export interface ServicoDTO {
nomeNegocio: any;
categorias: any;
whatsapp: string;
  id: number; 
  categoria: string; 
  bairro: string; 
  telefone: string; 
  descricao: string;
  usuarios?: UsuarioDTO; 
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL base para facilitar as chamadas das APIs
  private baseUrl = 'https://catalogoservicos.onrender.com/api';

  constructor(private http: HttpClient) { }

  // ENDPOINTS DE AUTENTICAÇÃO

  cadastrarUsuario(usuario: any): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.baseUrl}/auth/registrar`, usuario);
  }

  login(dadosLogin: any): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.baseUrl}/auth/login`, dadosLogin);
  }

  // ENDPOINTS DE SERVIÇOS

  // Método para persistir os dados do prestador no banco 
  salvarServico(servico: any): Observable<ServicoDTO> {
    return this.http.post<ServicoDTO>(`${this.baseUrl}/servicos/salvar`, servico);
  }

  // Método de busca dinâmico que bate no controller de serviços novo
  buscarServicos(categoria: string, bairro: string): Observable<ServicoDTO[]> {
    let params = new HttpParams();
    if (categoria) params = params.set('categoria', categoria);
    if (bairro) params = params.set('bairro', bairro);

    return this.http.get<ServicoDTO[]>(`${this.baseUrl}/servicos/buscar`, { params });
  }
}
