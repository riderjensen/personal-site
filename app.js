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

const wordSearchFor = 'fuck';

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

mongoose.connect('mongodb://localhost:27017/redditDays', {
	useNewUrlParser: true
}).then(() => {
	app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}).catch(err => console.log(err))




// Reddit bot
try {
	const r = new Snoowrap(redditUserInformation);

	const client = new Snoostorm(r);

	const streamOpts = {
		subreddit: `funny+AskReddit+worldnews+pics+science+todayilearned+gaming+videos+movies+aww+IAmA+Music+gifs+news+blog+EarthPorn+askscience+explainlikeimfive+books+Showerthoughts+mildlyinteresting+television+LifeProTips+Jokes+DIY+space+food+gadgets+nottheonion+sports+Art+photoshopbattles+GetMotivated+tifu+Documentaries+UpliftingNews+listentothis+dataisbeautiful+history+Futurology+personalfinance+OldSchoolCool+philosophy+WritingPrompts+nosleep+creepy+TwoXChromosomes+technology+Fitness+AdviceAnimals+WTF+bestof+politics+interestingasfuck+wholesomememes+BlackPeopleTwitter+oddlysatisfying+memes+atheism+woahdude+leagueoflegends+facepalm+reactiongifs+relationships+europe+pcmasterrace+me_irl+travel+lifehacks+gonewild+Whatcouldgowrong+Unexpected+NatureIsFuckingLit+Overwatch+gameofthrones+dankmemes+nba+malefashionadvice+tattoos+Android+trippinthroughtime+Tinder+Games+programming+AnimalsBeingJerks+AnimalsBeingBros+PS4+instant_regret+mildlyinfuriating+FoodPorn+hiphopheads+CrappyDesign+dadjokes+GifRecipes+BikiniBottomTwitter+soccer+trees+buildapc+pokemon+HistoryPorn+nonononoyes+loseit+pokemongo+Damnthatsinteresting+HighQualityGifs+gardening+humor+boardgames+Eyebleach+OutOfTheLoop+nsfw+sex+NSFW_GIF+BetterEveryLoop+RealGirls+rarepuppers+comics+ContagiousLaughter+wheredidthesodago+Wellthatsucks+xboxone+BeAmazed+EatCheapAndHealthy+Cooking+trashy+Bitcoin+rickandmorty+AnimalsBeingDerps+ChildrenFallingOver+cringepics+relationship_advice+Frugal+cats+itookapicture+pcgaming+hmmm+4chan+StarWars+FortNiteBR+iphone+RoastMe+cars+photography+nfl+NintendoSwitch+MadeMeSmile+YouShouldKnow+hearthstone+quityourbullshit+teenagers+scifi+wow+keto+apple+confession+recipes+HumansBeingBros+youtubehaiku+cringe+blackmagicfuckery+AskHistorians+bodyweightfitness+slowcooking+FiftyFifty+MealPrepSunday+MovieDetails+WhitePeopleTwitter+holdmybeer+reallifedoodles+streetwear+woodworking+NetflixBestOf+AskMen+ImGoingToHellForThis+PeopleFuckingDying+Minecraft+iamverysmart+baseball+MakeupAddiction+nevertellmetheodds+anime+RoomPorn+howto+insanepeoplefacebook+DunderMifflin+Roadcam+learnprogramming+battlestations+whatisthisthing+PrequelMemes+SkincareAddiction+DestinyTheGame+offmychest+thatHappened+PerfectTiming+AskWomen+PUBATTLEGROUNDS+DnD+nintendo+CryptoCurrency+dogs+PewdiepieSubmissions+shittyaskscience+comicbooks+GlobalOffensive+MemeEconomy+NoStupidQuestions+holdthemoan+GamePhysics+therewasanattempt+Awwducational+TrollXChromosomes+conspiracy+frugalmalefashion+madlads+youseeingthisshit+entertainment+oldpeoplefacebook+educationalgifs+urbanexploration+WatchPeopleDieInside+MurderedByWords+ChoosingBeggars+backpacking+natureismetal+raspberry_pi+AbandonedPorn+nononono+hockey+ProgrammerHumor+wallpaper+The_Donald+femalefashionadvice+assholedesign+MMA+savedyouaclick+niceguys+ATBGE+socialskills+BustyPetite+starterpacks+changemyview+manga+drawing+shittyfoodporn+horror+TrollYChromosome+OopsDidntMeanTo+math+legaladvice`,
		requestDelay: 5000
	};

	const comments = client.CommentStream(streamOpts);


	let countingObject = {};

	comments.on('comment', (comment) => {
		let commentSub = comment.subreddit_name_prefixed;
		if (countingObject[commentSub]) {
			countingObject[commentSub].com++;
			if (comment.body.includes(wordSearchFor)) {
				countingObject[commentSub].found++;
			}
		} else {
			countingObject[commentSub] = {
				com: 1,
				found: 0
			}
		}

	});

	setInterval(() => {
		const newDayModel = new DayModel({
			items: countingObject
		});
		newDayModel.save().then(response => {
			countingObject = {};
		})
		console.log(countingObject)
	}, 360000)

} catch (err) {
	console.log(err)
}




// mongod --dbpath "C:\Program Files\MongoDB\data"