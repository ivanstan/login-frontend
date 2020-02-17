import React from 'react';
import { translate } from 'react-polyglot';
import { observer } from 'mobx-react';
import { store } from "../services/stores/Store";
import { Button, Card, CardContent, FormHelperText, LinearProgress, TextField, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { PasswordField } from "../components/forms/PasswordField";
import * as EmailValidator from 'email-validator';
import { FilledInputProps } from "@material-ui/core/FilledInput";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";

const useStyles: any = theme => ({
  spacerBottom: {
    marginBottom: theme.spacing(3),
  },
});

@observer
class Login extends React.Component<any, any> {

  private email: any;
  private password: any;

  readonly state: any = {
    dirty: false,
    email: '',
    emailError: null,
    password: '',
    passwordError: null,
    loading: false,
    formError: null,
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.email = React.createRef();
    this.password = React.createRef();
  }

  submit = async () => {
    const { email, password } = this.state;
    const { t } = this.props;

    this.setState({ loading: true });

    try {
      await store.login(email, password);

      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (response) {

      if (response.status === 403) {
        this.setState({ formError: t('Invalid credentials.') });
      }

      this.setState({ loading: false });
    }
  };

  handleChange = (prop: string, event: any) => {
    let state = this.state;
    state[prop] = event.target.value;
    state['dirty'] = true;
    this.setState(state);
    this.validate();
  };

  validate = () => {
    const { t } = this.props;
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

    this.setState({ emailError: emailError, passwordError: passwordError });
  };

  isValid = (): boolean => {
    const { emailError, passwordError } = this.state;

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
    const { t, classes } = this.props;
    const { email, password, emailError, passwordError, dirty, formError } = this.state;

    return <Container maxWidth="xs">
      <div className="h-screen">
        <Card variant="outlined" className="vertical-align">
          <CardContent>
            <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
              {t('Login')}
            </Typography>

            <form>
              <FormHelperText error={true} style={{ marginBottom: 30, marginTop: 15 }}>
                {formError || ' '}
              </FormHelperText>

              <TextField
                className={classes.spacerBottom}
                InputProps={{ autoComplete: 'email' } as FilledInputProps}
                autoFocus
                label={t('Email')}
                variant="outlined"
                value={email}
                fullWidth
                error={emailError !== null}
                helperText={dirty && (emailError || ' ')}
                onChange={e => this.handleChange('email', e)}
                ref={input => this.email = input}
              />

              <PasswordField
                label={t('Password')}
                variant="outlined" value={password}
                fullWidth
                onChange={(e: Event) => this.handleChange('password', e)}
                onKeyPress={this.onKeyPress}
                error={dirty && (passwordError !== null)}
                helperText={passwordError}
                ref={input => this.password = input}
                className={classes.spacerBottom}
              />

              <LinearProgress className={!this.state.loading ? "invisible" : 'visible'}/>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.submit} size="large"
                disabled={!this.isSubmitEnabled()}
              >
                {t('Login')}
              </Button>

            </form>
          </CardContent>

        </Card>
      </div>
    </Container>;
  };
}

export default translate()(withStyles(useStyles)(Login))

