const express = require('express');
const grapqHHTTP = require('express-graphql');
const schema = require('./schema/schema');


const app = express();


app.use('/graphql', grapqHHTTP({
    schema: schema,
    graphiql: true
}));

var listener  = app.listen(4000, function() {

    console.log("Express server listening on port %d", listener.address().port);
});

const obj = {
    name: "Fred",
    age: 42,
    id: 1
  }
  
  //simple destructuring
  const { name , age} = obj;
  console.log("name", name);
  console.log(age+' dd');
  
//   //assigning multiple variables at one time
//   const { age, id } = obj;
//   console.log("age", age);
//   console.log("name", id);
  
  //using different names for the properties
  const { name: personName } = obj;
  console.log("personName", personName);
