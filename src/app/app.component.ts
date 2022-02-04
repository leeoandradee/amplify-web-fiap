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
