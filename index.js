var Twit = require('twit');
const keys = require('dotenv').config();

const Bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});


console.log('O bot ta funcionando ...');

function BotInit() {
	var query = {
		q: "(corno)",
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot não pôde achar o último tweet: ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot já retweetou: ' + error);
				}
				else {
					console.log('Bot retweetou: ' + id.id);
				}
			}
		}
	}
}

BotInit();
setInterval(BotInit, 5*60*1000); //5 minutos