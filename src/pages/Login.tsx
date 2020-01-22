import React from 'react';
import {translate} from 'react-polyglot';
import {observer} from 'mobx-react';
import {store} from "../services/stores/Store";

@observer class Login extends React.Component<any, any> {

  readonly state: any = {
    email: '',
    password: '',
  };

  submit = () => {
    const {email, password} = this.state;

    store.login(email, password)
      .then(user => {
        console.log(user)
      })
      .catch(exception => {

      console.log(exception)

    });
  };

  render(): any {
    const {email, password} = this.state;

    return <div>
      <input value={email} onChange={e => this.setState({email: e.target.value})}/>
      <input value={password} onChange={e => this.setState({password: e.target.value})}/>
      <button onClick={this.submit}>Login</button>
    </div>;
  }
}

export default translate()(Login);
