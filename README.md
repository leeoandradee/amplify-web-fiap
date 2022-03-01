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

**Como publicar nova versao no bucket**

*1 - Rodar o comando do git para adicionar novas alterações no git*
```powershell
git status
git add .
git commit -m "adding new changes"
git push origin master
```
*Isso fará que execute a pipeline configurada no Amplify, executando os steps de: build e deploy*


**Como configurar o deploy com o Amplify**

*1 - Vamos criar um projeto Angular com os seguintes passos*

```powershell
npx -p @angular/cli ng new nome_do_seu_app

- Would you like to add Angular routing? Y
- Which stylesheet format would you like to use? selecione o seu estilo como preferencia

cd nome_do_seu_app
```



*2 - Depois que o app foi criado, vamos entrar adicionar no src/polyfills.ts os seguintes códigos para dar suporte a versão do Angular 6+*
```javascript
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

*3 - Vamos configurar o Amplify rodando o seguinte comando*
```bash
amplify init
```

*4 - Agora vamos seguir os seguintes passos*

```bash

# Vamos digitar o nome do app
Enter a name for the project (nome_do_seu_app)

# Agora vamos escolher o nome do ambiente que queremos criar, como estamos fazendo para estudo, vamos deixar como dev
Enter a name for the environment (dev)

# As vezes o CLI mostra para editar alguns arquivos, entao vamos escolher o que estamos utilizando agora
Choose your default editor

# Vamos escolher javascript como linguagem de build
Choose the type of app that you're building (javascript)

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

*5 - Agora vamos instalar a dependencia do Amplify dentro do Angular*
```bash
npm install --save aws-amplify @aws-amplify/ui-angular
```

*6 - Vamos adicionar no app.module.ts a importação do módulo do Amplify*
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

*7 - No main.ts vamos adicionar a configuracao do Amplify*
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

*8 - Por ultimo vamos o tsconfig.app.ts para compilar*
```typescript
/* To learn more about this file see: https://angular.io/config/tsconfig. */
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

*9 - Agora podemos colocar no app.component.html as seguintes configuracoes*
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


*10 - Agora vamos colocar no app.component.ts as seguintes configuracoes*
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












*2 - *

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

