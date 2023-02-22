const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const rooms = require('../game_data/rooms');

router.get('/', (req, res) => {
    let sqlText = `SELECT room FROM player_data
    WHERE id=1`
    pool.query(sqlText)
    .then((dbRes) => {
        res.send(...rooms.filter((room) => {
            // console.log(dbRes.rows[0].room)
            // console.log(room)
            if (room.name == dbRes.rows[0].room) {
                return room;
            }
        }));
    })
    .catch((err) => {
        console.error(err);
    })
})

module.exports = router;