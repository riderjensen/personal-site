const {
	buildSchema
} = require('graphql');

module.exports = buildSchema(`
	type RootMutation {

	}
	type RootQuery {
		
	}
	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);