const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// var books = [
//     {name:"name of bool",genre:"fantasy",id:"1",authorId:'1'},
//     {name:"name of fairy tale",genre:"fantasy",id:"2",authorId:'2'},
//     {name:"name of bool",genre:"fantasy",id:"3",authorId:'3'},
//     {name:"name of bool",genre:"fantasy",id:"3",authorId:'2'}
// ];


// var authors = [
//     {name:"johny",age:25,id:"1"},
//     {name:"sin",age:24,id:"2"},
//     {name:"mia",age:21,id:"3"}
// ];





const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        authorId: {
            type: GraphQLID
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //  return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId)
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, {authorId: parent.id});
                return Book.find({
                    authorId: parent.id
                })
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //     return _.find(books, {id: args.id});
                return Book.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //  return books;
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //  return books;
                return Author.find({})
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //     return _.find(authors, {id: args.id});
                return Author.findById(args.id)
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();

            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: GraphQLString
                },
                authorId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId

                });
                return book.save();

            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});