const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const offbrandRoute = require('./routes/offbrand.route');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false,
	useNewUrlParser: true
}));
app.use(bodyParser.json());

app.use(helmet());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/api', (req, res) => res.send('<p>This route has been closed due to security concerns. You are welcome to view the source code on <a href="https://github.com/riderjensen/Personal-Site">github</a></p>'));

app.get('/sub', (req, res) => res.send('<p>This route has been closed due to security concerns. You are welcome to view the source code on <a href="https://github.com/riderjensen/Personal-Site">github</a></p>'));

app.use('/offbrand', offbrandRoute);

app.get('/', (req, res) => res.render('index'));

app.get('*', (req, res) => res.redirect('/'))

app.listen(PORT, () => console.log(`Example app listening on port ${port}!`));
