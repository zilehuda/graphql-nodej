import React, { Component } from 'react'
import {getAuthorsQuery, addBookMutation, getBookQuery} from '../queries/queries.js'
import {graphql, compose} from 'react-apollo'


class AddBook  extends Component {

  constructor(props){
    super(props);
    this.state = {
        name:"",
        genre:"",
        authorId:""
    }
  }
  DisplayAuthors(){
      var data = this.props.getAuthorsQuery
      if(data.loading)
      {
        return (<option >loading</option>)
      }
      else
      {
          return data.authors.map(author =>{
              return (<option key={author.id} value={author.id}>{author.name}</option>)
          })
      } 
  }
  
  submitForm(e){
      
    e.preventDefault();
    console.log(this.state);
    this.props.addBookMutation({
        variables: {
            name: this.state.name,
            genre: this.state.genre,
            authorId: this.state.authorId
        },
        refetchQueries: [{query: getBookQuery}]
    });

  }


  render() {

    return (
        <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <input type="text" onChange={(e) => this.setState({ name: e.target.value }) }/><br/>
        <input type="text" onChange={(e) => this.setState({ genre: e.target.value }) }/><br/>
        <select onChange={(e) => this.setState({ authorId: e.target.value }) }>
        <option >please select</option>
        {this.DisplayAuthors()}
        </select>
        <button>submit</button>
        </form> 
    );
  }
}

export default compose(

    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
