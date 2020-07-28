import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {InMemoryCache, ApolloClient} from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import { BrowserRouter } from 'react-router-dom';
import {createUploadLink} from "apollo-upload-client"
// Local State
import {typeDefs, resolvers} from "./state/typeDefs"

const token = localStorage.getItem("auth_token")

const clientConfig = {
  uri: "http://localhost:4000/",
  headers: {}
}

if(token && JSON.parse(token)!=="null"&&JSON.parse(token)!=="undefined"){
  clientConfig.headers = {
    "Authorization": "Bearer "+JSON.parse(token)
  }
}

const cache = new InMemoryCache()

const client = new ApolloClient({link: createUploadLink(clientConfig),
                                 cache, 
                                 typeDefs,
                                 resolvers})
                                 

// initializing local state  

cache.writeData({data: {loggedIn: false, signedUp: false}})
                                 
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
