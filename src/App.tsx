import React from 'react'
import 'animate.css/animate.min.css'
import {HashRouter as Router, Route} from 'react-router-dom'
import {AnimatedSwitch} from 'react-router-transition'
import Header from './components/Header'
import Home from './pages/Home'
import {observer} from 'mobx-react'
import {store} from './services/stores/Store'
import {I18n} from 'react-polyglot'
import {Helmet} from 'react-helmet'
import Login from "./pages/Login";
import './scss/main.scss';

@observer export default class App extends React.Component<any, any> {

  render(): any {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8"/>
          {/*<title>My Title</title>*/}
          {/*<link rel="canonical" href="http://mysite.com/example"/>*/}
        </Helmet>

        <I18n locale={store.locale} messages={store.messages} allowMissing={true}>
          <Router>
            <Header/>
            <AnimatedSwitch
              atEnter={{opacity: 0}}
              atLeave={{opacity: 0}}
              atActive={{opacity: 1}}
            >
              <Route path="/" exact component={Home}/>
              <Route path="/login" exact component={Login}/>
            </AnimatedSwitch>
          </Router>
        </I18n>
      </>
    )
  }
}
