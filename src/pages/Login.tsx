import React from 'react';
import {translate} from 'react-polyglot';
import {observer} from 'mobx-react';
import {store} from "../services/stores/Store";
import {Button, Card, CardContent, styled, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {PasswordField} from "../components/forms/PasswordField";
import * as EmailValidator from 'email-validator';

const EmailField = styled(TextField)({
  marginBottom: 15,
});

const StyledPasswordField = styled(PasswordField)({
  marginBottom: 15,
});

@observer
class Login extends React.Component<any, any> {

  private email: any;
  private password: any;

  readonly state: any = {
    email: '',
    emailError: null,
    password: '',
    passwordError: null,
    loading: false,
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.email = React.createRef();
    this.password = React.createRef();
  }

  submit = () => {
    const {email, password} = this.state;

    this.setState({
      loading: true
    });
    store.login(email, password)
      .then(user => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(exception => {
        this.setState({
          loading: false
        });

        console.log(exception)

      });
  };

  handleChange = (prop: string, event: any) => {
    let state = this.state;
    state[prop] = event.target.value;
    this.setState(state);
    this.validate();
  };

  validate = () => {
    const {t} = this.props;
    let emailError = null;
    let passwordError = null;

    if (!this.state.email) {
      emailError = t('Email is required.');
    }

    if (!EmailValidator.validate(this.state.email)) {
      emailError = t('Please enter valid email.');
    }

    if (!this.state.password) {
      passwordError = t('Password is required.');
    }

    this.setState({emailError: emailError, passwordError: passwordError});
  };

  isValid = (): boolean => {
    const {emailError, passwordError} = this.state;

    return emailError === null && passwordError === null;
  };

  isSubmitEnabled = (): boolean => {
    return !this.state.loading && this.isValid();
  };

  onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && this.isSubmitEnabled()) {
      this.submit();
    }
  };

  render = (): any => {
    const {t} = this.props;
    const {email, password, emailError, passwordError} = this.state;

    return <Container maxWidth="xs">
      <div className="h-screen">
        <Card variant="outlined" className="vertical-align">
          <CardContent>

            <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
              {t('Login')}
            </Typography>

            <EmailField
              autoFocus
              label={t('Email')}
              variant="outlined"
              value={email}
              fullWidth
              error={emailError !== null}
              helperText={emailError || ' '}
              onChange={e => this.handleChange('email', e)}
              ref={input => this.email = input}
            />

            <StyledPasswordField
              label={t('Password')}
              variant="outlined" value={password}
              fullWidth
              onChange={(e: Event) => this.handleChange('password', e)}
              onKeyPress={this.onKeyPress}
              error={passwordError !== null}
              helperText={passwordError}
              ref={input => this.password = input}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit} size="large"
              disabled={!this.isSubmitEnabled()}
            >
              {t('Login')}
            </Button>
          </CardContent>

        </Card>
      </div>
    </Container>;
  };
}

export default translate()(Login);
