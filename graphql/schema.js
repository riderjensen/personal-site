const {
	buildSchema
} = require('graphql');

module.exports = buildSchema(`	


	type subName {
		com: Int
		found: Int
	}

	input comFound{
		com: Int!
		found: Int = 0
	}

	type onlyItemsObject {
		items: getSub
	}
	

	type wholeObj {
		items: getSub
		id: String!
		createdAt: String!
		updatedAt: String!
	}

	type getSub {
		funny: subName
		AskReddit: subName
		worldnews: subName
		pics: subName
		science: subName
		todayilearned: subName
		gaming: subName
		videos: subName
		movies: subName
		aww: subName
		IAmA: subName
		Music: subName
		gifs: subName
		news: subName
		blog: subName
		EarthPorn: subName
		askscience: subName
		explainlikeimfive: subName
		books: subName
		Showerthoughts: subName
		mildlyinteresting: subName
		television: subName
		LifeProTips: subName
		Jokes: subName
		DIY: subName
		space: subName
		food: subName
		gadgets: subName
		nottheonion: subName
		sports: subName
		Art: subName
		photoshopbattles: subName
		GetMotivated: subName
		tifu: subName
		Documentaries: subName
		UpliftingNews: subName
		listentothis: subName
		dataisbeautiful: subName
		history: subName
		Futurology: subName
		personalfinance: subName
		OldSchoolCool: subName
		philosophy: subName
		WritingPrompts: subName
		nosleep: subName
		creepy: subName
		TwoXChromosomes: subName
		technology: subName
		Fitness: subName
		AdviceAnimals: subName
		WTF: subName
		bestof: subName
		politics: subName
		interestingasfuck: subName
		wholesomememes: subName
		BlackPeopleTwitter: subName
		oddlysatisfying: subName
		memes: subName
		atheism: subName
		woahdude: subName
		leagueoflegends: subName
		facepalm: subName
		reactiongifs: subName
		relationships: subName
		europe: subName
		pcmasterrace: subName
		me_irl: subName
		travel: subName
		lifehacks: subName
		gonewild: subName
		Whatcouldgowrong: subName
		Unexpected: subName
		NatureIsFuckingLit: subName
		Overwatch: subName
		gameofthrones: subName
		dankmemes: subName
		nba: subName
		malefashionadvice: subName
		tattoos: subName
		Android: subName
		trippinthroughtime: subName
		Tinder: subName
		Games: subName
		programming: subName
		AnimalsBeingJerks: subName
		AnimalsBeingBros: subName
		PS4: subName
		instant_regret: subName
		mildlyinfuriating: subName
		FoodPorn: subName
		hiphopheads: subName
		CrappyDesign: subName
		dadjokes: subName
		GifRecipes: subName
		BikiniBottomTwitter: subName
		soccer: subName
		trees: subName
		buildapc: subName
		pokemon: subName
		HistoryPorn: subName
		nonononoyes: subName
		loseit: subName
		pokemongo: subName
		Damnthatsinteresting: subName
		HighQualityGifs: subName
		gardening: subName
		humor: subName
		boardgames: subName
		Eyebleach: subName
		OutOfTheLoop: subName
		nsfw: subName
		sex: subName
		NSFW_GIF: subName
		BetterEveryLoop: subName
		RealGirls: subName
		rarepuppers: subName
		comics: subName
		ContagiousLaughter: subName
		wheredidthesodago: subName
		Wellthatsucks: subName
		xboxone: subName
		BeAmazed: subName
		EatCheapAndHealthy: subName
		Cooking: subName
		trashy: subName
		Bitcoin: subName
		rickandmorty: subName
		AnimalsBeingDerps: subName
		ChildrenFallingOver: subName
		cringepics: subName
		relationship_advice: subName
		Frugal: subName
		cats: subName
		itookapicture: subName
		pcgaming: subName
		hmmm: subName
		StarWars: subName
		FortNiteBR: subName
		iphone: subName
		RoastMe: subName
		cars: subName
		photography: subName
		nfl: subName
		NintendoSwitch: subName
		MadeMeSmile: subName
		YouShouldKnow: subName
		hearthstone: subName
		quityourbullshit: subName
		teenagers: subName
		scifi: subName
		wow: subName
		keto: subName
		apple: subName
		confession: subName
		recipes: subName
		HumansBeingBros: subName
		youtubehaiku: subName
		cringe: subName
		blackmagicfuckery: subName
		AskHistorians: subName
		bodyweightfitness: subName
		slowcooking: subName
		FiftyFifty: subName
		MealPrepSunday: subName
		MovieDetails: subName
		WhitePeopleTwitter: subName
		holdmybeer: subName
		reallifedoodles: subName
		streetwear: subName
		woodworking: subName
		NetflixBestOf: subName
		AskMen: subName
		ImGoingToHellForThis: subName
		PeopleFuckingDying: subName
		Minecraft: subName
		iamverysmart: subName
		baseball: subName
		MakeupAddiction: subName
		nevertellmetheodds: subName
		anime: subName
		RoomPorn: subName
		howto: subName
		insanepeoplefacebook: subName
		DunderMifflin: subName
		Roadcam: subName
		learnprogramming: subName
		battlestations: subName
		whatisthisthing: subName
		PrequelMemes: subName
		SkincareAddiction: subName
		DestinyTheGame: subName
		offmychest: subName
		thatHappened: subName
		PerfectTiming: subName
		AskWomen: subName
		PUBATTLEGROUNDS: subName
		DnD: subName
		nintendo: subName
		CryptoCurrency: subName
		dogs: subName
		PewdiepieSubmissions: subName
		shittyaskscience: subName
		comicbooks: subName
		GlobalOffensive: subName
		MemeEconomy: subName
		NoStupidQuestions: subName
		holdthemoan: subName
		GamePhysics: subName
		therewasanattempt: subName
		Awwducational: subName
		TrollXChromosomes: subName
		conspiracy: subName
		frugalmalefashion: subName
		madlads: subName
		youseeingthisshit: subName
		entertainment: subName
		oldpeoplefacebook: subName
		educationalgifs: subName
		urbanexploration: subName
		WatchPeopleDieInside: subName
		MurderedByWords: subName
		ChoosingBeggars: subName
		backpacking: subName
		natureismetal: subName
		raspberry_pi: subName
		AbandonedPorn: subName
		nononono: subName
		hockey: subName
		ProgrammerHumor: subName
		wallpaper: subName
		The_Donald: subName
		femalefashionadvice: subName
		assholedesign: subName
		MMA: subName
		savedyouaclick: subName
		niceguys: subName
		ATBGE: subName
		socialskills: subName
		BustyPetite: subName
		starterpacks: subName
		changemyview: subName
		manga: subName
		drawing: subName
		shittyfoodporn: subName
		horror: subName
		TrollYChromosome: subName
		OopsDidntMeanTo: subName
		math: subName
		legaladvice: subName
	}

	type RootQuery {
		getOneById(id: ID!): wholeObj
		getAllItems: [wholeObj]
		getRange(start: String!, end: String): [wholeObj]!
		getCombinedRange(start: String!, end: String): onlyItemsObject!
	}

	type RootMutation {
		deleteDataPoint(id: ID!): Boolean
		deleteSubDataPoint(id: ID!, sub: String!): Boolean
		createNewItem: wholeObj
		editItem(id: ID!, sub: String!, completedFound: comFound!): Boolean
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);