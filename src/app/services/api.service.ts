import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL base para facilitar as chamadas das APIs
  private baseUrl = 'https://catalogoservicos.onrender.com/api';

  constructor(private http: HttpClient) { }

  //ENDPOINTS DE AUTENTICAÇÃO

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/registrar`, usuario);
  }

  login(dadosLogin: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, dadosLogin);
  }

  //ENDPOINTS DE SERVIÇOS

  // Método para persistir os dados do prestador no banco 
  salvarServico(servico: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/servicos/salvar`, servico);
  }

  // Método de busca dinâmico que bate no controller de serviços novo
  buscarServicos(categoria: string, bairro: string): Observable<any[]> {
    let params = new HttpParams();
    if (categoria) params = params.set('categoria', categoria);
    if (bairro) params = params.set('bairro', bairro);

    return this.http.get<any[]>(`${this.baseUrl}/servicos/buscar`, { params });
  }
}
