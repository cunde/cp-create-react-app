import React from 'react'
import App from './App';
import AboutPage from './about.jsx';
import TabPages from './newtabs/index.jsx';
// NOTE: URL https://reacttraining.com/react-router/web/api/BrowserRouter
import {Router, Route, Switch} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

export default(
    <Router history={history}>
        <Switch>
            <Route exact={true} path="/" component={App}/>
            <Route path="/about" component={AboutPage}/>
            <Route pathe="/tabs" component={TabPages} />
        </Switch>
    </Router>
)
