const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const { StudentType, InstructorType } = require("./schemaTypes");
const mutation = require("./mutations");

