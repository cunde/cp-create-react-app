import React from 'react'
// import { Router, Route, Link, createHashHistory, customHistory } from 'react-router'
import App from './App';
import AboutPage from './about.jsx';
import TabPages from './newtabs/tab.jsx';
import {Router, Route, Switch} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

export default(
    <Router history={history}>
        <Switch>
            <Route exact={true} path="/" component={App}/>
            <Route path="/about" component={AboutPage}/>
            <Route pathe="/us" component={TabPages} />
        </Switch>
    </Router>
)
