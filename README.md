# My Personal Site

Includes a portfolio and api as well as a bot

## REST Api Instructions

* /api - Gets 100 items from the DB
* /api/range/:range - Gets range must be sent in the following format YEAR-MM-DD$YEAR-MM-DD
* /api/:sub - Tries to find the sub, doesnt include r/. For example, look for r/askreddit with just typing in /askreddit
* /api/:sub/:range - Does the same thing as /:sub but with a range within this format YEAR-MM-DD$YEAR-MM-DD
* /api/create - returns a new item product id that you can update or delete
* /api/delete/:id - delete the item from the database
* /api/update/:id - select the item that you want to update with the :id and an object with values that you want to fill it with

Data must be in this format when sent
```
{
	"items" : {
		"com": number,
		"found": number
	
	}
}
```

## GraphQL 

* /sub - GraphiQL area

Before running any queries, you will want to run createANewOne in order to get an ID that you can edit. The only items that you are allowed to edit are ones that you have generated yourself. You may then replace all instances of {ID} in the code with your ID as a string.

Any start and end dates are seconds since Epoch.

Examples of queries

```
query getNames{
	getNames{
		id
    updatedAt
		createdAt
	}
}


query getFullRange{
	getRange(start: "0" end: "9551901377407" sub: "funny") {
		createdAt
    updatedAt
    id
    item{
      com
      found
    }
	}
}

query getCombined{
	getCombinedRange(start: "0" end: "9551901377407" sub: "funny") {
		com
		found
	}
}

query getOne{
	getOneById(id: "{ID}" sub: "funny"){
		id
    updatedAt
		createdAt
    item{
      com
      found
    }
	}
}

mutation deleteOne{
	deleteDataPoint(id: "{ID}")
}

mutation deleteSubOne{
	deleteSubDataPoint(id: "{ID}", sub: "news")
}

mutation createANewOne{
	createNewItem{
		id
	}
}

mutation editOne{
	editItem(id: "{ID}" sub: "funny" completedFound: {
		com: 10,
		found: 5
	})
}


```
