const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {mongoUri} = require('./config');
const mongoDb = require('./dbs/mongo');

const router = require('./routes/');

const port = 5555;

const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);


async function start(mongoUri) {
  try {
    await mongoDb.connect(mongoUri);
    console.log('Connected to mongoDB');

    console.log(`Listening on port ${port}`);
    await app.listen(port);
  } catch (err) {
    console.log(err)
    return process.exit(1);
  }
}

return start(mongoUri);  
