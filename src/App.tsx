import React from 'react'
import 'animate.css/animate.min.css'
import {HashRouter as Router, Route} from 'react-router-dom'
import {AnimatedSwitch} from 'react-router-transition'
import Home from './pages/Home'
import {observer} from 'mobx-react'
import {store} from './services/stores/Store'
import {I18n} from 'react-polyglot'
import {Helmet} from 'react-helmet'
import Login from "./pages/Login";
import './scss/main.scss';
import {UserCollection} from "./pages/Admin/User/UserCollection";
import {If} from "react-if";

@observer export default class App extends React.Component<any, any> {

  public state: any = {
    init: false,
  };

  componentDidMount = async () => {
    const user = await store.me();

    if (user) {
      console.info('Logged in as: ' + user.email);
    } else {
      console.info('Logged in as: Anonymous');
    }

    this.setState({init: true});
  };

  render(): any {
    const {init} = this.state;

    return (
      <>
        <Helmet>
          <meta charSet="utf-8"/>
          {/*<title>My Title</title>*/}
          {/*<link rel="canonical" href="http://mysite.com/example"/>*/}
        </Helmet>

        <If condition={init}>

          <I18n locale={store.locale} messages={store.messages} allowMissing={true}>
            <Router>
              <AnimatedSwitch
                atEnter={{opacity: 0}}
                atLeave={{opacity: 0}}
                atActive={{opacity: 1}}
              >
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/admin/users" exact component={UserCollection}/>
              </AnimatedSwitch>
            </Router>
          </I18n>

        </If>
      </>
    )
  }
}
