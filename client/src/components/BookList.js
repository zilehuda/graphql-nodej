import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getBookQuery = gql`
{
    books{
        name
        id
    }
}
`

class BookList extends Component {
  render() {
      console.log(this);
    return (
      <div>
      <ul  id="book-list">
        <li>book 1</li>
      </ul>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
