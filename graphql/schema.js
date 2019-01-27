const {
	buildSchema
} = require('graphql');

module.exports = buildSchema(`	
	type Test {
		title: String
	}

	type RootQuery {
		boop: Test
	}

	schema {
		query: RootQuery
	}
`);