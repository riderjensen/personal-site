const {
	buildSchema
} = require('graphql');

module.exports = buildSchema(`	


	type subName {
		com: Int!
		found: Int!
	}

	input comFound{
		com: Int!
		found: Int = 0
	}
	

	type getObj {
		id: String!
		createdAt: String!
		updatedAt: String!
	}

	type RootQuery {
		getOneById(id: ID! sub: String!): getObj 
		getNames: [getObj]
		getSubName(name: String!): subName
		getRange(sub: String!, start: String!, end: String): [subName]!
		getCombinedRange(sub: String!, start: String!, end: String): subName!
	}

	type RootMutation {
		deleteDataPoint(id: ID!): Boolean
		deleteSubDataPoint(id: ID!, sub: String!): Boolean
		createNewItem: getObj
		editItem(id: ID!, sub: String!, completedFound: comFound!): Boolean
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);