# MQTTChat
A chat application that use MQTT to communication

## Requeriments

* Comunicação um-a-um (one-to-one) e comunicação em grupo
    * Identificadores de usuários (ID) são únicos;
    * Assumir que usuários conhecem o ID dos demais usuários.
* Modo de comunicação: comunicação com usuários online com persitência de dados para
usuários offline.
    * Há um tópico para interação de controle com cada cliente: ID_Control
    * Exemplo: para um usuário com ID = X o tópico será X_Control
    * Cada cliente assina e publica no seu próprio tópico de controle (os demais só podem publicar).
    * Solicitação/negociação de uma nova sessão (conversation) deve ser via o canal de controle: cada sessão deve ter, para o mesmo par de usuários, um identificador único.
        * Ao aceitar a solicitação, o usuário solicitado define um tópico com o mesmo nome correspondente ao identificador da sessão. Exemplo: assumindo que Y quer falar com X, o nome do tópico pode sera X_Y_timestamp (timestamp pode ser o horário atual de início do bate-papo).
        * O identificador da sessão (nome do novo tópico) é comunicado ao solicitante via publicação no seu tópico de cliente (i.e., publish to ID_Cliente). No exemplo anterior, X publicaria no tópico de Y (ou seja, Y_Control).
* Definir um tópico de controle USERS onde são publicados o status (online ou offline) de
cada usuário. Assumir que cada usuário comunica seu estado online ao iniciar o aplicativo, e
o estado offline antes de encerrar o aplicativo.
* Definir um tópico de controle GROUPS onde são publicadas informações de cada grupo:
nome do grupo, nome do usuário que é líder do grupo e lista dos demais membros. A
solicitação de ingresso a um grupo deve ser dirigida ao líder que, após aceitar, atualiza a
informação do grupo via publicação no tópico GROUPS.
### Etapa 01
* Descrever o projeto do sistema, contemplando a arquitetura do sistema e a definição e
formato dos tópicos de controle para comunicação um-a-um e em grupo.
* Implementação da aplicação contemplando uma interface amigável (pode ser modo texto)
com menu de todas as opções básicas para comunicação:
    * Listagem dos usuários e seus respectivos status (online/offline);
    * Criação de grupo (caso o grupo não exista, o criador do grupo se autodeclara líder do mesmo).
    * Listagem dos grupos cadastrados: para cada grupo, listar o nome do grupo, líder e demais membros;
    * Solicitação de conversa e, para depuração, listagem do histórico de solicitação recebidas, bem como listagem das confirmações de aceitação da solicitação de batepapo (listar, apenas para depuração, a informação do tópico criado para iniciar o bate-papo).
### Etapa 2
* Implementar a funcionalidade de comunicação um-a-um e em grupo.
* Elaborar um relatório descritivo da aplicação desenvolvida, incluindo todas as informações
necessárias para compreender o projeto, a arquitetura e o desenvolvimento da aplicação.
## Onde e o que submeter
* Onde: Submeter via SIGAA. Quando em grupo, apenas um dos integrantes precisa
submeter!
* O quê: Para cada etapa, em um único arquivo comprimido, incluir:
    * Todos os arquivos correspondentes ao código fonte, incluindo um arquivo com instruções (LEIAME.TXT) para compilação e utilização do aplicativo, bem como identificação do(a) autor(a) ou autores(as);
    * Somente para a versão final (Etapa 2): incluir o relatório (em formato PDF) que contenha, no mínimo, as seguintes informações:
        * Folha de rosto com identificação do(a) autor(a) ou autores(as).
        * Descrição do projeto.
        * Arquitetura do sistema/aplicativo: deve ficar clara a estrutura e descrição de todos os tópicos envolvidos no processo de comunicação, bem como os mecanismos empregados em todas as funcionalidades implementadas.
        * Descrição dos principais aspectos da implementação.
        * Instruções para compilação e utilização do aplicativo.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
