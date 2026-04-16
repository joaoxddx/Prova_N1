# To-Do List MVC - FormaPro 📝

Uma aplicação ágil, moderna e reativa para gerenciamento de tarefas desenvolvida utilizando Javascript Puro (Módulos ES6) e **Arquitetura MVC** (*Model, View, Controller*), com foco total na separação lógica de conceitos e persistência de dados no Local Storage do navegador.

## ✨ Funcionalidades
- **CRUD Completo:** Adicionar, Ler (listar), Atualizar (editar descrição ou status) e Excluir as tarefas.
- **Gerenciamento de Prazos:** Capacidade de estipular uma data de início e uma data limite de entrega para cada uma das tarefas com validações nativas (impedindo de salvar com entrega anterior ao início).
- **Rápida Persistência:** Tudo fica salvo no seu próprio navegador via `localStorage`, significando que a aplicação funcionará offline e manterá suas tarefas entre cada reload instantaneamente.
- **Design Dinâmico:** Interface totalmente desenvolvida com a integração do **Bootstrap 5.3 CDN** permitindo visuais modernos, espaçamento coerente, uso de ícones (`bootstrap-icons`) e layout condicional.

## 🧱 Arquitetura e Estrutura
O projeto respeita rigorosamente o padrão **MVC** sem intersecções que quebrem as responsabilidades:

- **Model (`model/`)**: Guarda nossa classe de Negócios `Tarefa`. É nela que são realizadas todas as construções (`dataCriacao` automática, identificadores) e contém a importantíssima função de Validação (status vazio, choques temporais).
- **Service (`services/`)**: A camada isolada em `TarefaService` é quem tem intimidade com o Banco de Dados (no nosso caso, convertendo pra `JSON` e gravando na `API LocalStorage`).
- **Controller (`Controller/`)**: É a verdadeira ponte. A classe `TarefaController` orquestra a chamada de validação do Model e envia tudo pro Service quando concluído.
- **View (`index.html` e `main.mjs`)**: Componente que cuida puramente da interface (`DOM`). Captura eventos de clique/envio nativos com Listeners e manda dados primitivos pro Controller interagir. Nunca toca na validação da regra de negócio nem no backend.

## 🚀 Como instalar e executar
Como o projeto utiliza Javascript moderno em formato de módulos ES6 (`type="module"`), não é recomendado rodar via `file://` dando dois cliques no arquivo `index.html` para não sofrer bloqueios do CORS.

Basta ter o `Node.js` instalado na máquina, clonar este repositório e executar usando um pequeno servidor local.

1. No terminal, estando dentro da raiz deste projeto, simplesmente execute:
```bash
npm start
```
> Isso irá executar subjacente o comando nativo `npx serve .`

2. O terminal vai imprimir uma porta (costuma ser `http://localhost:3000`). Segure o `CTRL` do seu teclado e clique nela! Pronto! A aplicação estará rodando perfeitamente.
