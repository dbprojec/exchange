import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Graph from './graph/graph';
const history = createBrowserHistory()
ReactDOM.render(
    <Router history={history}>
        <div>
            <Route path="/" component={App}/>
            <Route path="/btc" component={Graph}/>
            <Route path="/eth" component={Graph}/>
        </div>
    </Router>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
