const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const history = require('./routes/command.router.js');
const room = require('./routes/room.router.js');
const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for post/put requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/command', history);
app.use('/room', room)


/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});