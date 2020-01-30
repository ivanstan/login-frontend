import React from 'react';
import {translate} from 'react-polyglot';
import {observer} from 'mobx-react';
import {store} from "../services/stores/Store";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {PasswordField} from "../components/forms/PasswordField";

@observer
class Login extends React.Component<any, any> {

  readonly state: any = {
    email: '',
    password: ''
  };

  submit = () => {
    const {email, password} = this.state;

    store.login(email, password)
      .then(user => {
        this.props.history.push('/');
      })
      .catch(exception => {

        console.log(exception)

      });
  };

  handleChange = (prop: string, event: any) => {
    let state = this.state;
    state[prop] = event.target.value;
    this.setState(state);
  };
  
  render(): any {
    const {t} = this.props;
    const {email, password} = this.state;

    return <Container maxWidth="xs" className="h-screen">
      <TextField label={t('Email')} variant="outlined" value={email} required fullWidth
                 onChange={e => this.handleChange('email', e)}/>

      <PasswordField label={t('Password')} variant="outlined" value={password} required fullWidth
                     onChange={(e: Event) => this.handleChange('password', e)}/>

      <Button variant="contained" color="primary" onClick={this.submit} size="large">
        {t('Login')}
      </Button>
    </Container>;
  }
}

export default translate()(Login);
