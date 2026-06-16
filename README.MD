# 🧪 Poções e Soluções - Merigold

Projeto full-stack desenvolvido como Atividade Prática 2 para a disciplina **SCC0219 - Introdução ao Desenvolvimento Web**. 

O sistema consiste em uma loja virtual de poções mágicas para a cliente Anna Innabelle Merigold, contendo uma interface pública para clientes (SPA) e um painel de administração restrito para gerenciamento de estoque.

## 🛠 Tecnologias Utilizadas

O projeto foi dividido em duas partes principais, seguindo uma arquitetura de Web Service consumido por um Front-end dinâmico.

**Back-end (Web Service)**
* **Node.js** com **Express** para roteamento da API.
* **Sequelize** como ORM.
* **SQLite** operando em modo memória (`:memory:`) para armazenamento ágil e volátil.
* **CORS** para permissão de requisições do front-end.

**Front-end (SPA)**
* **React** construído com **Vite**.
* **React Router Dom** para roteamento no lado do cliente (Single Page Application).
* **Axios** para requisições HTTP assíncronas comunicando com o Web Service.
* **React Bootstrap** e CSS customizado para estilização seguindo a paleta de cores escuras e a fonte *Gill Sans* solicitadas.
* **React Icons** para a interface de gerenciamento.

## ⚙️ Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado em sua máquina. Como o projeto possui dois ambientes separados (Front-end e Back-end), você precisará rodar ambos simultaneamente em terminais distintos.

### Passo 1: Inicializando o Back-end (Web Service)

1. Abra um terminal e navegue até a pasta do servidor.
```bash
cd /backend
```

2. Instale as dependências do Node:

```bash
npm install express cors sequelize sqlite3
```

3. Inicie o servidor:
```bash
node server.js
```

Nota: O servidor estará rodando na porta 3000 e o banco de dados em memória do SQLite será sincronizado e populado automaticamente.


### Passo 2: Inicializando o Front-End (Interface React)

1. Abra um novo terminal no root do projeto e navegue até a pasta de front-end (criada com o Vite)
```bash
cd /frontend
cd /front-pocoes
```

2. Instale as dependências do projeto:
```bash
npm install
```
3. Execute o ambiente de desenvolvimento:
```bash
npm run dev
```
Nota: O terminal exibirá um link local (geralmente http://localhost:5173). Clique nele para abrir a loja da Merigold no navegador.


## 📌 Funcionalidades Implementadas

* **Visão do Comprador (`/`):**
  * Histórico da loja e informações de contato no rodapé.
  * Listagem dinâmica das poções recuperadas do Web Service via AJAX/Axios.
  * Layout responsivo utilizando *cards* com nome, descrição, imagem, preço e botão de compra.

* **Visão da Administração (`/admin`):**
  * Formulário de cadastro de novas poções com integração via método `POST`.
  * Listagem do estoque atual.
  * Remoção de poções com integração via método `DELETE`.

---
*Desenvolvido para fins acadêmicos.*
