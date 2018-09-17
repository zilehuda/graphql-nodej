import React, { Component } from 'react';
import BookList from './components/BookList';
import AppoloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


//appolo client setup

const client = new AppoloClient({
  uri: 'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (

      <ApolloProvider client={client}>
      <div id="App">
      <h1>New GraphQl</h1>
      <BookList/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
