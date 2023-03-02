const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const ignored = require('../modules/ignored')

// GET history
router.get('/', (req, res) => {
    // Get all of the treats from the database
    // console.log('test')
    const sqlText = `SELECT * FROM history`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

// POST command
router.post('/', (req, res) => {
    //console.log(req.body);
    const message = req.body.message;
    const playerInfo = req.body.playerInfo;
    //console.log(playerInfo);
    res.send(parseCommand(message, playerInfo));
});

function parseCommand(message, playerInfo) {
    message = message.toLowerCase();
    let split = message.split(' ').filter(
        (element) => {
            if (!ignored.includes(element)) { return element }
        });
    let response = {};
    //console.log(split)
    switch (split[0]) {
        case 'go':
            response.type = "GO";
            if (split[2]) {
                split[1] = `${split[1]} ${split[2]}`;
                console.log(split[1]);
            }
            if (!split[1]) {
                response.result = `Go where?`
                return response;
            } if (playerInfo.room.name == split[1]) {
                response.result = `You are already there.`
                return response;
            } if (playerInfo.room.exits.includes(split[1])) {
                pool.query(`UPDATE player_data
                SET room = $2
                WHERE id=$1`, [1, split[1]])
                response.result = `You go to the ${split[1]}.`
                return response;
            } else {
                response.result = `You don't know how to get there.`
                return response;
            }
        case 'open':
            response.type = "OPEN";
            if (!split[1]) {
                response.result = `Open what?`
                return response;
            }
            response.result = `You open the ${split[1]}`
            return response;
        case 'use':
            response.type = "USE";
            if (!split[1]) {
                response.result = `Use what?`
                return response;
            }
            if (split[2]) {
                response.result = `You use the ${split[1]} on the ${split.slice(2, split.length).join(' ')}.`
                return response;
            } else {
                response.result = `Use the ${split[1]} on what?`
                return response;
            }
        case 'exits':
            response.type = "EXITS";
            response.result = playerInfo.room.exits.join(', ')
            return response;
        case 'take':
            response.type = "TAKE";
            if (!split[1]) {
                response.result = `Take what?`
                return response;
            }
            for (let item of playerInfo.room.items) {
                //console.log(item)
                if (item == (split[1])) {
                    response.result = `You take the ${split[1]}`;
                    response.item = item;
                    return response;
                }
            }
            response.result = `There's no ${split[1]} for you to take.`
            return response;
        case 'look':
            response.type = "LOOK";
            //console.log(playerInfo.room.interactables)
            if (!split[1]) {
                response.result = playerInfo.room.description;
                return response;
            }
            if (split[1] == 'items') {
                if (playerInfo.room.items[0] == undefined) {
                    response.result = "You don't see anything particularly interesting to pick up."
                    return response;
                }
                response.result = playerInfo.room.items.join(', ');
                return response;
            }
            for (let object of playerInfo.room.interactables) {
                console.log(object)
                if (object[(split[1])]) {
                    response.result = object[(split[1])].description;
                    return response;
                }
            }
            response.result = `You don't see a ${split[1]} here.`
            return response;
        default:
            response.result = 'Sorry, I don\'t understand what you\'re trying to do.'
    }
    return response;
}

module.exports = router;