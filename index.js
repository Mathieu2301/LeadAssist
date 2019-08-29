const http = require("http");

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        let post = "";
        req.on("data", data => post += data.toString());
        req.on("end", async () => {
            let json = undefined;
            try {
                json = JSON.parse(post);
            } catch(e) {};

            if (json !== undefined && json.auth.token == "Q79v5tcxVQ8u") {
                res.writeHead(200);
                res.end();
                treat(json, () => {
                    console.log(games)
                    sendData(io.sockets);
                });
            }

        });
    }
});

server.listen(2181);
console.log("listening on :2181");

const crypto = require('crypto');
const fs = require('fs');
// const io = require('socket.io')(server);
const io = require('socket.io').listen(require('https').createServer({
    key: fs.readFileSync('/home/main/config/SSL/private.key'),
    cert: fs.readFileSync('/home/main/config/SSL/certificate.crt')
}).listen(2180));
console.log("listening on :2180");

const games = {};

io.on("connect", client => {
    sendData(client);
    client.on("fetch", _=> sendData(client))
});

async function sendData(client){
    await Object.keys(games).forEach(gameid => {
        if (games[gameid].infos.lastinfo + 120000 > Date.now()){
            Object.keys(games[gameid].players).forEach(userid => {
                if (games[gameid].players[userid].lastinfo + 60000 < Date.now()){
                    delete games[gameid].players[userid];
                    console.log("Deleting " + gameid)
                }
            });
        }else{
            delete games[gameid];
            console.log("Deleting " + gameid)
        }
    });
    client.emit("data", games);
}

function treat(json, callback){
    if (json && json.map && json.player.team) {
        let gameID = crypto.createHash('sha1').update(`${json.map.mode}_${json.map.name}_${json.player.team}`).digest("hex");

        if (!games[gameID]) games[gameID] = {infos: {}, players: {}}
        games[gameID].infos = {
            map: json.map.name,
            mode: json.map.mode,
            round: json.round,
            team: json.player.team,
            rounds: json.map.round_wins,
            spectators: json.map.current_spectators,
            scores: {
                CT: json.map.team_ct,
                T: json.map.team_t
            },
            lastinfo: Date.now()
        }
    
        games[gameID].players[json.player.steamid] = {
            name: json.player.name,
            activity: json.player.activity,
            stats: json.player.match_stats,
            state: json.player.state,
            weapons: json.player.weapons,
            lastinfo: Date.now()
        }

        
        // if (json.allplayers) Object.keys(json.allplayers).forEach((id) => {
        //     let player = json.allplayers[id];
        //     games[gameID].players[id] = {
        //         name: player.name,
        //         activity: "playing",
        //         team: player.team,
        //         stats: player.match_stats,
        //         state: player.state,
        //         weapons: player.weapons
        //     }
        // });

        callback();
    }
}