import { Routes } from '@angular/router';
import { BuscaServicosComponent } from './components/busca-servicos/busca-servicos.component';
import { CadastroComponent } from './components/cadastro/cadastro.component'; 
import { LoginComponent } from './components/login/login.component';
import { PainelPrestadorComponent } from './components/painel-prestador/painel-prestador.component';

export const routes: Routes = [
  { path: '', component: BuscaServicosComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'meu-servico', component: PainelPrestadorComponent }
];

