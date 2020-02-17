import React from 'react'
import 'animate.css/animate.min.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import { observer } from 'mobx-react'
import { store } from './services/stores/Store'
import { I18n } from 'react-polyglot'
import { Helmet } from 'react-helmet'
import Login from "./pages/Login";
import './scss/main.scss';
import UserCollection from "./pages/Admin/User/UserCollection";
import { Else, If, Then } from "react-if";
import Loader from "./components/Loader";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { Role } from "./model/Role";
import { locale } from "./services/LocaleStore";

@observer export default class App extends React.Component<any, any> {

  public state: any = {
    init: false,
  };

  componentDidMount = async () => {
    const user = await store.me();

    if (user.id) {
      console.info('Logged in as: ' + user.email);
    } else {
      console.info('Logged in as: Anonymous');
    }

    this.setState({ init: true });
  };

  render(): any {
    const { init } = this.state;

    return (
      <>
        <Helmet>
          <meta charSet="utf-8"/>
          {/*<title>My Title</title>*/}
          {/*<link rel="canonical" href="http://mysite.com/example"/>*/}
        </Helmet>
        <If condition={init}>
          <Then>
            <I18n locale={locale.current} messages={locale.messages} allowMissing={true}>
              <Router>
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/login" exact component={Login}/>
                  <PrivateRoute path="/admin/users" exact condition={store.user.hasRole(Role.Admin)}>
                    <UserCollection/>
                  </PrivateRoute>
                  <Route component={NotFound}/>
                </Switch>
              </Router>
            </I18n>
          </Then>
          <Else>
            <Loader/>
          </Else>
        </If>
      </>
    )
  }
}
