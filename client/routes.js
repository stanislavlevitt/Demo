import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Home, CashFlow, AllClients, SingleClient} from './components'

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/clients/:id" component={SingleClient} />
      <Route path="/clients" component={AllClients} />
      <Route path="/cashFlow" component={CashFlow} />
    </Switch>
  )
}

export default Routes
