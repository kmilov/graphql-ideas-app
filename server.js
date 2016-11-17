var webpack = require('webpack');
var webpackdevserver = require('webpack-dev-server');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;

// Dummy data, this should be on a RethinkDB
var ideas = {
  1:{
    id: 1,
    name: "An App to get ideas from the world",
    user: "Dom",
  },
  2:{
    id: 2,
    name: "What about to create an idea factory?",
    user: "Nick",
  },
  3:{
    id: 3,
    name: "Remind them to get some stuff done",
    user: "Jason",
  },
};

var ideasType = new GraphQLObjectType({
  name: "Ideas",
  description: "An idea from the ideas db",
  fields: {
    name: {
      type: GraphQLString,
      description: "The name of the idea"
    },
    user: {
      type: GraphQLString,
      description: "The author of the idea"
    },
    id: {
      type: GraphQLInt,
      description: "ID of this idea",
    },
  }
})

var queryType = new GraphQLObjectType({
  name: "query",
  description: "Goldberg query",
  fields: function(){
    return {
      ideas: {
        type: ideasType,
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve: function (_, args) {
          return getIdea(args.id);
        }
      }
    }
  }
});

// Resolve to an idea based on an ID, could connect to a database and return the data
function getIdea(id) {
  return ideas[id];
}


var schema = new GraphQLSchema({
  query: queryType
})

var graphQLServer = express()
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true  }));
graphQLServer.listen(8080);


var compiler = webpack({
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
});

var app = new webpackdevserver(compiler, {
  contentBase: "/public/",
  proxy: {"/graphql": "http://localhost:8080"},
  publicPath: "/static/",
  stats: {colors: true},
  noInfo: true
});

app.use("/", express.static("static"));
app.listen(3000)
console.log("The app server is running...");
console.log("The graphql server is up and running...!");
console.log("GraphiQL on http://localhost:8080");
console.log("Ideas APP on http://localhost:3000");
