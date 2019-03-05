const {
	buildSchema
} = require('graphql');

module.exports = buildSchema(`	

	type getObj {
		id: String!
		createdAt: String!
		updatedAt: String!
	}

	type RootQuery {
		getNames: [getObj]
	}

	schema {
		query: RootQuery
	}
`);