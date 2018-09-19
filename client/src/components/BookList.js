import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import {getBookQuery} from '../queries/queries.js'


class BookList extends Component {

  DisplayBooks(){
      var data = this.props.data
      if(data.loading)
      {
        return (<div>data is loading...</div>)
      }
      else
      {
          return data.books.map(book =>{
              return (<li key={book.id}>{book.name} {book.genre}</li>)
          })
      } 
  }
  render() {
    return (
      <div>
      <ul  id="book-list">
        {this.DisplayBooks()}
      </ul>
      </div>
    );
  }
  
}

export default graphql(getBookQuery)(BookList);
