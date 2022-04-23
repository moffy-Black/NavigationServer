

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const functions = require('firebase-functions');
const express = require('express');
const app = express();

const cors = require('cors')({origin: true});
app.use(cors);

app.get('/', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) +1 ;

    res.set('Cache-Control', `public, max-age=${secondLeftBeforeEndOfHour(date)}`);

    res.send(`
    <!doctype html>
    <head>
      <title>Time</title>
      <link rel="stylesheet" href="/style.css">
      <script src="/script.js"></script>
    </head>
    <body>
      <p>In London, the clock strikes: <span id="bongs">${'BONG '.repeat(hours)}</span></p>
      <button onClick="refresh(this)">Refresh</button>
    </body>
  </html>`);
});

app.get('/api', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) +1 ;

    res.set('Cache-Control', `public, max-age=${secondLeftBeforeEndOfHour(date)}`);

    res.json({bongs: 'BONG '.repeat(hours)});
});

function secondLeftBeforeEndOfHour(date) {
    const m = date.getMinutes();
    const s = date.getSeconds();
    return 3600 - (m*60) -s;
}

exports.app = functions.https.onRequest(app);