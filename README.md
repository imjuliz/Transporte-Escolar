# Sistema de Acompanhamento de Transporte Escolar

## Visão Geral

A falta de visibilidade dos pais em relação ao trajeto e aos horários do transporte escolar tem gerado dificuldades na comunicação. Muitas vezes, informações sobre atrasos ou mudanças de rota não são devidamente repassadas, causando insegurança e transtornos. Este projeto visa solucionar esse problema por meio do desenvolvimento de um sistema funcional que permite:
- Acompanhamento de rotas
- Cadastro de motoristas, veículos e alunos
- Painel de localização intuitivo

## Principais Tecnologias Utilizadas
Para garantir padronização, qualidade e coerência técnica, adotamos as seguintes tecnologias:
* **MySQL Workbench**: Ferramenta utilizada para o gerenciamento do banco de dados.
* **Node.js**: Responsável pelo desenvolvimento do back-end, facilitando a criação de APIs.
  * **Express.js**: Framework para Node.js, usado para criar rotas e gerenciar requisições HTTP.
  * **Express-session**: Middleware que gerencia sessões de usuário no back-end, essencial para autenticação e persistência de login.
* **Next.js**: Framework para o front-end baseado em React, que otimiza o desempenho e facilita a implementação de páginas dinâmicas.
* **Tailwind CSS**: Framework de utilitários CSS que permite maior flexibilidade e eficiência na construção da interface visual.
  * **Flowbite**: Biblioteca de componentes UI baseada em Tailwind.
  * **Preline UI**: Conjunto de componentes estilizados com Tailwind.
  * **ShadCN UI**: Sistema de componentes que combina Radix UI, Tailwind e estilos acessíveis.
* **Leaflet**: Biblioteca JavaScript especializada em mapas interativos, usada para exibir e manipular informações geoespaciais.
* **Leaflet Routing Machine**: Extensão do Leaflet que fornece funcionalidades de roteamento, permitindo calcular e exibir trajetos.

## Acesso ao Site

Você pode acessar o site executando localmente, seguindo as instruções abaixo:

1. Clone o repositório:

    ```bash
    git clone https://github.com/imjuliz/Transporte-Escolar.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd Transporte-Escolar
    ```

3. Execute o servidor back-end e instale as dependências
    ```bash
    cd server
    npm install express cors express-session mysql2
    node --watch app.js
    ```

4. Execute o servidor front-end e instale as dependências
    ```bash
    cd app
    npm install next react react-dom @tailwindcss/postcss autoprefixer leaflet leaflet-routing-machine flowbite
    npm run dev
    ```
5. Configure o banco de dados e inicie o módulo MySQL
   
   Crie um banco de dados MySQL chamado transporteEscolar e execute o script SQL fornecido (tranporteEscolar.sql).
   Abra o XAMPP Control Panel e clique no botão "Start" ao lado de MySQL.

## Colaboradores do projeto
- [Julia Alves](https://github.com/imjuliz)
- [Maria Del Rey](https://github.com/mebdrey)
- [Lorena Oshiro](https://github.com/hirowski)
