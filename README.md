O projeto foi criado com intuito de estudar melhor o serviço Amplify da AWS.
No projeto foi utilizado o Angular 13 e fluxo de cadastro e autenticação.

**Como executar o projeto local**

*1 - Fazer o clone do projeto em seu workspace*
```powershell
git clone git@github.com:leeoandradee/amplify-web-fiap.git
```
*2 - Rodar o comando para instalar as dependências do projeto*
```powershell
npm install
```
*3- Rodar o comando para fazer o start da aplicação no localhost*
```powershell
npm start
```

**Como subir uma nova versão com Amplify**
*1 - Rodar o comando do git para adicionar novas alterações no git*
```powershell
git status
git add .
git commit -m "adding new changes"
git push origin master
```
*Isso fará que execute a pipeline configurado no Amplify, executando os steps de: build, test e deploy*