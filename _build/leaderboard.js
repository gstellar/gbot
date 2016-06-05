/*

View leaderboard - username, rank, number of points

# USAGE
    /leaderboard                        -   shows the whole leaderboard
    /leaderboard [username]             -   shows the rank for the specified user
    /leaderboard me                     -   shows your rank

*/

function leaderboard(slashCommand, message) {
    // console.log("leaderboard command");
    
    // slashCommand.replyPublic(message, "1", function() {
    //     slashCommand.replyPublicDelayed(message, "2").then(slashCommand.replyPublicDelayed(message, "3"));
    // });
    showLeaderboard(slashCommand, message);
}

// Listening methods
controller.hears(['leaderboard'],['direct_message','direct_mention'],function(bot,message) {
    leaderboard = [
        {rank:1, name:"stellabot", points:10},
        {rank:2, name:"alisterdev", points:6},
        {rank:3, name:"dramos", points:3},
        {rank:4, name:"blynks", points:1},
    ];
    var responseObj = showLeaderboard(leaderboard);
    bot.reply(message,responseObj, function(err,resp) {
        console.log(err,resp);
    });
});

controller.hears(['my position'],['direct_message','direct_mention'],function(bot,message) {
    console.log("STELLA");
    console.log(bot);
    console.log("STELLA");
    
    leaderboard = [
        {rank:1, name:"stellabot", points:10},
        {rank:2, name:"alisterdev", points:6},
        {rank:3, name:"dramos", points:3},
        {rank:4, name:"blynks", points:1},
    ];
    
    var responseObj = showPosition(leaderboard, bot);
    bot.reply(message,responseObj, function(err,resp) {
        console.log(err,resp);
    });
});

controller.hears(['winner'],['direct_message','direct_mention'],function(bot,message) {
    var responseObj = winnerMessage(bot, message);
    bot.reply(message,responseObj, function(err,resp) {
        console.log(err,resp);
    });
});

controller.hears(['loser'],['direct_message','direct_mention'],function(bot,message) {
    var responseObj = loserMessage(bot, message);
    bot.reply(message,responseObj, function(err,resp) {
        console.log(err,resp);
    });
});

// Getters
function showPosition(leaderboard, bot) {
   
    
    var formattedLeaderboard = [];

    leaderboard.forEach(function(entry) {
        console.log(bot["identity"]["name"]);
        if (entry["name"] == bot["identity"]["name"]) {
            
        
        if (entry["rank"] == 1) {
            formattedLeaderboard.push(
            {
                value: entry["rank"] + ". " + entry["name"] + " :crown:",
                short: true
            }
        );
        }
        else {
            formattedLeaderboard.push(
            {
                value: entry["rank"] + ". " + entry["name"],
                short: true
            }
        );
        }
        formattedLeaderboard.push(
            {
                title: entry["points"] + " :watermelon:",
                short: true
            }
        );
    }
    });
    
    var attachments = [];
    var attachment = {
        fallback: "Leaderboard position",
        fields: formattedLeaderboard,
    };

    attachments.push(attachment);

    return {attachments: attachments};
}

function showLeaderboard(leaderboard) {
    
    var formattedLeaderboard = [];
    
    leaderboard.forEach(function(entry) {
        
        if (entry["rank"] == 1) {
            formattedLeaderboard.push(
            {
                value: entry["rank"] + ". " + entry["name"] + " :crown:",
                short: true
            }
        );
        }
        else {
            formattedLeaderboard.push(
            {
                value: entry["rank"] + ". " + entry["name"],
                short: true
            }
        );
        }
        formattedLeaderboard.push(
            {
                title: entry["points"] + " :watermelon:",
                short: true
            }
        );
    });
    
    var attachments = [];
    var attachment = {
        fallback: "Leaderboard",
        title: 'Leaderboard',
        fields: formattedLeaderboard,
        mrkdwn_in: ["fields"],
    };

    attachments.push(attachment);

    return {attachments: attachments};
}

// NEED TO BE CALLED AT THE END OF EACH GAME
function winnerMessage() {
    var attachments = [];
    var attachment = {
        fallback: "Winner",
        text: ':trophy: :star2: *YOU WON!!!* :star2: :trophy:',
        mrkdwn_in: ["text"],
    };

    attachments.push(attachment);

    return {attachments: attachments};
}

// NEED TO BE CALLED AT THE END OF EACH GAME
function loserMessage() {
    var attachments = [];
    var attachment = {
        fallback: "Loser",
        text: ':thunder_cloud_and_rain: *SORRY, YOU LOST* :( :thunder_cloud_and_rain:',
        mrkdwn_in: ["text"],
    };

    attachments.push(attachment);

    return {attachments: attachments};
}