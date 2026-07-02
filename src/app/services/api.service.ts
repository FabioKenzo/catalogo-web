import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioDTO {
  id: number;
  nome: string;
  email: string;
  tipoPerfil: string;
}

export interface ServicoDTO {
  id?: number;
  nome: string;       //nome do negocio
  categoria: string;  //nome da ategoria
  bairro: string;
  telefone: string;   //whatsApp mapeado como telefone
  descricao: string;
  usuario?: UsuarioDTO; //objeto aninhado com o nome do prestador
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://catalogoservicos.onrender.com';

  constructor(private http: HttpClient) { }

  //efetuar login
  login(dadosLogin: { email: string; senha: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, dadosLogin);
  }

  //cadastrar user
  cadastrarUsuario(usuario: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/api/auth/registrar`, usuario);
}

  
   //salvar comercio/servico
  salvarComercioLivre(dadosServico: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/comercios/salvar`, dadosServico, { headers });
  }

  
   //busca principal
  buscarServicos(servico: string, bairro: string): Observable<any[]> {
    return this.buscarPorServicoEBairro(servico, bairro);
  }

    //busca por servico e bairro 
    //Aberta para todos
  buscarPorServicoEBairro(servico: string, bairro: string): Observable<any[]> {
    let params = new HttpParams()
      .set('servico', servico)
      .set('bairro', bairro);

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    //se o user estiver logado anexa o token por garantia
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<any[]>(`${this.baseUrl}/api/comercios/buscar`, { params, headers });
  }

  //busca id especifico
  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/comercios/${id}`);
  }
}