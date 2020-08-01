import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';
import  {ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { typeDefs, resolvers } from './state/typeDefs';
import {from, ApolloLink} from "@apollo/client/core"
import { LOGIN_LOCAL, SIGNED_UP } from './schema/local/Query';

const link = createUploadLink({uri: "http://localhost:4000"})

const cache = new InMemoryCache()

const auth_link = new ApolloLink((operation, forward)=>{
  const refresh_token = localStorage.getItem("refresh_token")
  const auth_token = localStorage.getItem("auth_token")
  operation.setContext({
    headers: {
      "Authorization": `Bearer ${auth_token??null}`,
      "Refresh": `Bearer ${refresh_token??null}`}
    })
    return forward(operation)
  })
                                                            // ! Temporary Fix
const client = new ApolloClient({link: auth_link.concat((link as unknown) as ApolloLink) , cache, typeDefs, resolvers})

cache.writeQuery({query: LOGIN_LOCAL, data: {loggedIn: false}})
cache.writeQuery({query: SIGNED_UP, data: {signedUp: false}})

                                 
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
