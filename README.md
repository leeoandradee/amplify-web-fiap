**Sobre**

O projeto foi criado com intuito de estudar melhor o serviço Amplify da AWS.
No projeto foi utilizado o Angular 13 e fluxo de cadastro e autenticação.

**Membros**

Leonardo Andrade RM 341494

Matheus Tadeu RM 340506

**Como executar o projeto local**

*1 - Fazer o clone do projeto em seu workspace*
```bash
git clone git@github.com:leeoandradee/amplify-web-fiap.git
```
*2 - Rodar o comando para instalar as dependências do projeto*
```bash
npm install
```
*3- Rodar o comando para fazer o start da aplicação no localhost*
```bash
npm start
```

**Como configurar o deploy com o Amplify**

*1 - Vamos criar um projeto Angular com os seguintes passos*

```bash
npx -p @angular/cli ng new nome_do_seu_app

# Vamos colocar Y para adicionar o routing do Angular
Would you like to add Angular routing? Y

#Vamos selecionar o estilo de sua preferencia
Which stylesheet format would you like to use? selecione o seu estilo como preferencia

cd nome_do_seu_app
```

*2 - Vamos agora configurar o Amplify rodando o seguinte comando*
```bash
amplify init
```

*3 - Agora vamos seguir os seguintes passos*

```bash

# Vamos digitar o nome do app
Enter a name for the project (nome_do_seu_app)

# Agora vamos escolher o nome do ambiente que queremos criar, como estamos fazendo para estudo, vamos deixar como dev
Enter a name for the environment (dev)

# As vezes o CLI mostra para editar alguns arquivos, entao vamos escolher o que editor atual
Choose your default editor

# Vamos escolher javascript como linguagem de build
Choose the type of app that you are building (javascript)

# Vamos escolher o angular como framework
What JavaScript framework are you using (angular)

# Vamos escolher o diretorio src como diretorio raiz
Source directory path (src)

# Vamos escolher dist para quando realizar o build do app, gerar o main.js nessa pasta
Distribution directory path (dist)
Change from dist to dist/nome_do_seu_app

# Vamos deixar como default as seguintes opções
Build command (npm run-script build)

Start command (ng serve or npm start)
```

*4 - Agora vamos instalar o pacote do Amplify dentro do Angular*
```bash
npm install --save aws-amplify @aws-amplify/ui-angular
```

*5 -Vamos adicionar a opção de autenticação do Amplify com os seguintes passos*
```bash
amplify add auth

# Vamos escolher a configuração default de autenticação
Do you want to use the default authentication and security configuration? Default configuration

# Vamos escolher a opção de username como chave de login
How do you want users to be able to sign in? Username

# Vamos escolher a opção de que não vamos adicionar configurações avançadas no projeto
Do you want to configure advanced settings?  No, I am done.
```

**Agora que configuramos a parte do Amplify, vamos configurar o app Angular**

*1 - Vamos adicionar no src/polyfills.ts os seguinte código para dar suporte a versão do Angular 6+*
```javascript
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

*2 - Vamos adicionar no app.module.ts a importação do módulo do Amplify*
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

*3 - No main.ts vamos adicionar a configuracao do Amplify*
```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Amplify } from '@aws-amplify/core';
import AWSConfig from './aws-exports';

Amplify.configure(AWSConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

*4 - Por ultimo vamos o tsconfig.app.ts para compilar os arquivos javascript*
```typescript
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types" : ["node"]
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

*5 - Agora podemos colocar no app.component.html as seguintes configuracoes*
```html
<amplify-authenticator>
  <amplify-sign-up
    header-text="Criar uma nova conta"
    slot="sign-up"
    [formFields]="signUpFormFields"
    [submitButtonText]="'Criar conta'"
    [haveAccountText]="'Já tem uma conta?'"
  ></amplify-sign-up>
  <amplify-sign-in
    header-text="Entrar com sua conta"
    slot="sign-in"
    [formFields]="signInFormFields"
    [submitButtonText]="'Entrar'"
    (handleSubmit)="getUser()"
  ></amplify-sign-in>
  <amplify-forgot-password
    header-text="Esqueceu sua senha?"
    slot="forgot-password"
    [formFields]="forgotPasswordFormFields"
    [sendButtonText]="'Enviar código'"
  ></amplify-forgot-password>
  <div>
    <h3>Bem vindo, {{user?.username}}</h3>
    <amplify-sign-out></amplify-sign-out>
  </div>
  <!-- previous code -->
</amplify-authenticator>
```


*6 - Agora vamos colocar no app.component.ts as seguintes configuracoes*
```typescript
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'amplify-web-fiap';

  signUpFormFields: FormFieldTypes;
  signInFormFields: FormFieldTypes;
  forgotPasswordFormFields: FormFieldTypes;

  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef) {
    this.signUpFormFields = [
      {
        type: 'username',
        label: 'Nome de usuário *',
        placeholder: 'Digite um nome de usuário',
        inputProps: { required: true, autocomplete: 'username' },
      },
      {
        type: 'password',
        label: 'Senha *',
        placeholder: 'Digite uma senha',
        inputProps: { required: true, autocomplete: 'new-password' },
      },
      {
        type: 'email',
        label: 'E-mail  *',
        placeholder: 'Digite um e-mail',
        inputProps: { required: true, autocomplete: 'email' },
      },
    ];

    this.signInFormFields = [
      {
        type: 'username',
        label: 'Nome de usuário *',
        placeholder: 'Digite o nome de usuário',
        inputProps: { required: true, autocomplete: 'username' },
      },
      {
        type: 'password',
        label: 'Senha *',
        placeholder: 'Digite a senha',
        inputProps: { required: true, autocomplete: 'new-password' },
      },
    ];

    this.forgotPasswordFormFields = [
      {
        type: 'username',
        label: 'Nome de usuário *',
        placeholder: 'Digite o nome de usuário',
        inputProps: { required: true, autocomplete: 'username' },
      },
    ];
  }

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  getUser() {
    console.log('chamou');
  }
}
```

*7 - Agora já podemos rodar o projeto e fazermos um teste*
```bash
npm start
```
**Publicando nova versao no bucket**

*1 - Rodar o comando do git para adicionar novas alterações*
```bash
git status
git add .
git commit -m "novas alteracoes"
git push origin master
```
**Deploy da aplicação**

Para efetuar o deploy da aplicação será necessário criar um Host no S3 que é um serviço da Amazon para armazenamento de arquivos e dados, com isso teremos uma entrega contínua com o repositório do Github

Após a criação do repositório, será preciso rodar esse comando

```bash
amplify hosting add
```

Esse comando vai criar o host no Amplify

Depois disso quando aparecer Select the plugin module to execute escolha

```bash
Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
```

Isso foi escolhido porque vamos utilizar o Host do Amplify com entrega contínua

Quando aparecer Choose a type escolha a opção

```bash
Continuous deployment (Git-based deployments)
```

Já essa opção foi escolhida porque será utilizado a entrega contínua em um repositório Git

Depois disso entre no dashboard do Amplify na aba Hosting Environments e selecione qual serviço Git está utilizando, nesse caso é o GitHub e clique no botão Connect branch e vai abrir outra página para selecionar a branch do repositório

Nessa página autorize o Amplify acessar sua conta do Github selecione a aplicação e a branch master também o environment dev

Será necessário habilitar a opção 

```bash
Enable full-stack continuous deployments (CI/CD)
```

Essa opção foi habilitada para garantir que o deploy seja feito depois de ações no repositório Git

Clique agora em 

```bash
Create new role
```

Após isso será aberta uma nova aba onde será necessário clicar em next até criar a role necessária depois disso volte ao Amplify e selecione a role criada caso ela não apareça na lista, clique em Refresh existing roles para atualizar e depois disso clique em next de novo

Com a role criada revise as informações no Amplify e clique no botão

```bash
Save and Deploy
```

Depois disso a cada commit que for feito na branch master do repositório, será feito o deploy automaticamente com as alterações

Podemos acessar a aplicação no seguinte link

https://master.d32b0mqoens36d.amplifyapp.com/

Esse link foi gerado pelo Amplify
