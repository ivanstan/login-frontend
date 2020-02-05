import React from 'react'
import {translate} from 'react-polyglot'
import Header from "../components/Header";

class Home extends React.Component<any, any> {
  public render() {
    return (
      <>
        <Header/>
        <div className="mb-5">

        </div>
      </>
    )
  }
}

export default translate()(Home)
