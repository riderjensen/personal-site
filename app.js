const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const DayModel = require('./models/daySave');
const redditUserInformation = require('../env');

const apiRoute = require('./routes/api.route');
const offbrandRoute = require('./routes/offbrand.route');


const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false,
	useNewUrlParser: true
}));
app.use(bodyParser.json());

app.use(helmet());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api', apiRoute);

app.use('/offbrand', offbrandRoute);

app.use('/sub', graphqlHTTP({
	schema: graphqlSchema,
	rootValue: graphqlResolver,
	graphiql: true,
	formatError(err) {
		if (!err.originalError) {
			return err;
		}
		const data = err.originalError.data;
		const message = err.message || 'An error occured';
		const code = err.originalError.code || 500;
		return {
			message: message,
			status: code,
			data,
			data
		};
	}
}));

app.get('/', (req, res) => res.render('index'));

app.get('*', (req, res) => res.redirect('/'))

mongoose.connect(`mongodb+srv://${redditUserInformation.username}:${redditUserInformation.password}@nodecourse-zfafv.mongodb.net/redditDays?retryWrites=true`, {
	useNewUrlParser: true
}).then(() => {
	app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}).catch(err => console.log(err))