import {Component} from '@angular/core';
import {Produto} from "../modelo/Produto";
import {ProdutoService} from "../servico/produto.service";

// Decorador que define que a classe é um componente
@Component({
  selector: 'app-principal', // Seletor CSS para uso do componente
  templateUrl: './principal.component.html', // Caminho para o arquivo de template do componente
  styleUrl: './principal.component.css' // Caminho para o arquivo de estilos do componente
})
export class PrincipalComponent {

  produto = new Produto(); // Instância de Produto para manipulação no componente

  btnCadastro: boolean = true; // Flag para controle de exibição do botão de cadastro

  tabela: boolean = true; // Flag para controle de exibição da tabela de produtos

  produtos: Produto[] = []; // Array para armazenar a lista de produtos

  // Injeção do serviço de produtos no construtor do componente
  constructor(private servico: ProdutoService) {

  }

  // Método para obter a lista de produtos do serviço
  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.produtos = retorno);
  }

  // Método para adicionar um novo produto utilizando o serviço
  adicionar(): void {
    this.servico.adicionar(this.produto)
      .subscribe(retorno => {
        this.produtos.push(retorno);

        this.produto = new Produto();

        alert('Produto adicionado com sucesso!!!')
      });
  }

  // Método para selecionar um produto para edição
  selecionarProduto(posicao: number): void {
    this.produto = this.produtos[posicao];

    this.btnCadastro = false;

    this.tabela = false;
  }

  // Método para alterar um produto existente utilizando o serviço
  alterar(): void {

    this.servico.alterar(this.produto)
      .subscribe(retorno => {
        let posicao = this.produtos.findIndex(obj => {
          return obj.id == retorno.id;
        });

        this.produtos[posicao] = retorno;

        this.produto = new Produto();

        this.btnCadastro = true;

        this.tabela = true;

        alert("Produto alterado com sucesso")
      });
  }

  // Método para deletar um produto existente utilizando o serviço
  deletar(): void {

    this.servico.deletar(this.produto.id)
      .subscribe(retorno => {
        let posicao = this.produtos.findIndex(obj => {
          return obj.id == this.produto.id;
        });

        this.produtos.splice(posicao, 1);

        this.produto = new Produto();

        this.btnCadastro = true;

        this.tabela = true;

        alert("Produto deletado com sucesso")
      });
  }

  // Método para cancelar a edição de um produto
  cancelar(): void {
    this.produto = new Produto();

    this.btnCadastro = true;

    this.tabela = true;
  }

  // Método executado ao iniciar o componente
  ngOnInit() {
    this.selecionar();
  }
}
