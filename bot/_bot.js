// just a simple way to make sure we don't
// connect to the RTM twice for the same team
var _bots = {};
function trackBot(bot) {
  _bots[bot.config.token] = bot;
}
controller.on('create_bot', function (bot, config) {

  if (_bots[bot.config.token]) {
    // already online! do nothing.
  } else {
    bot.startRTM(function (err) {

      if (!err) {
        trackBot(bot);
      }

      bot.startPrivateConversation({ user: config.createdBy }, function (err, convo) {
        if (err) {
          console.log(err);
        } else {
          convo.say('I am a bot that has just joined your team');
          convo.say('You must now /invite me to a channel so that I can be of use!');
        }
      });

    });
  }

});


bot = controller.spawn({
  token: process.env.token
}).startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }
});

// Add bot listeners by section
require('./bets.js');
require('./leaderboard.js');
require('./stats.js');
require('./games.js');
require('./misc.js');