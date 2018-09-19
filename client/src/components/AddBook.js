import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`

class AddBook  extends Component {

  DisplayAuthors(){
      var data = this.props.data
      if(data.loading)
      {
        return (<option >loading</option>)
      }
      else
      {
          return data.authors.map(author =>{
              return (<option key={author.id} value={author.name}>{author.name}</option>)
          })
      } 
  }
  render() {
      console.log(this.props);
    return (
        <form id="add-book">
        <input type="text"></input><br/>
        <input type="text"></input><br/>
        <select>
        {this.DisplayAuthors()}
        </select>
        </form> 
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
