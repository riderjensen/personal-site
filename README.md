# My Personal Site

Includes a portfolio and api as well as a bot

## Api Instructions

* /api - Gets 100 items from the DB
* /api/range/:range - Gets range must be sent in the following format YEAR-MM-DD$YEAR-MM-DD
* /api/:sub - Tries to find the sub, doesnt include r/. For example, look for r/askreddit with just typing in /askreddit
* /api/:sub/:range - Does the same thing as /:sub but with a range within this format YEAR-MM-DD$YEAR-MM-DD
* /api/create - returns a new item product id, you can also send a set of starter items if you send an object based on the format below
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
