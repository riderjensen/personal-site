const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');



const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false,
	useNewUrlParser: true
}));
app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/submit', (req, res) => {
	if (req.body.email === '') {
		const {
			Name,
			userEmail,
			Phone,
			Subject,
			Comments
		} = req.body;

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'riderjensen@gmail.com',
				pass: ''
			}
		});

		const mailOptions = {
			from: 'riderjensen@gmail.com',
			to: 'riderjensen@gmail.com',
			subject: `Website message from ${Name}`,
			text: `A new request has come in from ${Name}. They say "${Subject}": "${Comments}". They can be reached at ${Phone} or ${userEmail}.`
		};

		transporter.sendMail(mailOptions, (error) => console.log(error));

		res.render('thank-you');
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))