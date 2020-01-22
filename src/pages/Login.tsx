import React from 'react';
import {translate} from 'react-polyglot';
import {observer} from 'mobx-react';
import {store} from "../services/stores/Store";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";

@observer
class Login extends React.Component<any, any> {

  readonly state: any = {
    email: '',
    password: '',
    showPassword: false,
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

  handleChange = (prop:string, event: any) => {
    let state = this.state;
    state[prop] = event.target.value;
    this.setState(state);
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword });
  };

  render(): any {
    const {email, password, showPassword} = this.state;

    return <Container maxWidth="sm">
      <TextField label="Email" variant="outlined" value={email} required
                 onChange={e => this.handleChange('email', e)}/>

      <FormControl variant="outlined" required>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => this.handleChange('password', e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={e => e.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button variant="contained" color="primary" onClick={this.submit}>
        Login
      </Button>
    </Container>;
  }
}

export default translate()(Login);
