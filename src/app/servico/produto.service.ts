// Importação das bibliotecas necessárias
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../modelo/Produto";

// Decorador que define que a classe é um serviço e pode ser injetada em outros componentes e serviços
@Injectable({
  providedIn: 'root' // Define que o serviço deve ser criado no root module da aplicação
})
export class ProdutoService {
  // URL base da API
  private url:string = 'https://projeto-backend-62pg.onrender.com';

  // Injeção do HttpClient no construtor do serviço
  constructor(private http:HttpClient) { }

  // Método para obter a lista de produtos da API
  selecionar():Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url+'/api/produtos');
  }

  // Método para adicionar um novo produto na API
  adicionar(obj:Produto):Observable<Produto>{
    return this.http.post<Produto>(this.url+'/api/produtos', obj);
  }

  // Método para alterar um produto existente na API
  alterar(obj: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/api/produtos/${obj.id}`, obj);
  }

  // Método para deletar um produto existente na API
  deletar(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/api/produtos/${id}`);
  }
}
