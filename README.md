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
*Isso fará que execute a pipeline configurado no Amplify, executando os steps de: build e deploy*


**Como configurar o deploy com o Amplify**

*1 - Com o git já configurado no projeto, vamos rodar o comando para adicionar um host no Bucket S3, onde nosso estático está hospedado*
```powershell
amplify hosting add
```

*2 - Escolha as opções a seguir, para podermos configurar que os arquivos da aplicação estática será pegado como base do GitHub*
```powershell
- Select the plugin module to execute
- Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
- Choose a type
- Continuous deployment (Git-based deployments)
```

