import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient , {InMemoryCache} from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import { BrowserRouter } from 'react-router-dom';

const token = localStorage.getItem("auth_token");

const clientConfig = {
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  headers: {}
}

if(token && token!=="null"&&token!=="undefined"){
  clientConfig.headers = {
    "Authorization": "Bearer "+token
  }
}

const client = new ApolloClient(clientConfig)

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
